Scoreboard API Specification

1. Overview
    - This document provides a detailed specification for the Scoreboard API module of the backend application server. The purpose of this module is to handle user scores securely, update them in real time, and provide a leaderboard displaying the Top 10 users based on their scores.

2. Functional Requirements
   Core Features
       2.1. Get Top 10 Scores
          – API must provide an endpoint to fetch the current top 10 users ranked by score.
       2.2. Update User Score
          – Users can perform an action that will increase their score. This must be securely validated.
       2.3. Real-Time Scoreboard Updates
          – Implement real-time updates so that users see the latest rankings without refreshing the page.
       2.4. Prevent Unauthorized Score Manipulation
          – Ensure security measures to prevent malicious users from artificially inflating their scores.

3. API Endpoints
   3.1. Get Top 10 Scores
       - Endpoint: GET /api/scores/top
       - Description: Fetches the top 10 users sorted by score.
       - Response: [{ "id": "1", "userName": "Lala", "score": 110 }, { "id": "2", "userName": "Lili", "score": 150 }]
       - Notes:
            - The response is sorted in descending order of scores.
            - The leaderboard is cached for performance optimization.

   3.2. Update User Score
       - Endpoint: POST /scores/update
       - Description: Increases the user’s score when they complete an action.
       - Request Headers: Authorization: Bearer <JWT_TOKEN>
       - Request Body: {"id": "1"}
       - Response: { "message": "Score updated successfully", "new_score": 200 }
       - Security Measures:
            - Uses JWT authentication to verify the user.
            - Score increments are validated on the server-side.
            - Request payloads are checked to prevent manipulation.
            - Implement rate limiting to prevent API abuse. 

   3.3. Real-Time Scoreboard Updates
       - Method: WebSocket (ws://server.com/scores/live)
       - Description: Broadcasts live scoreboard updates whenever a user’s score changes.
       - Example Message: { "id": "1", "userName": "Lala", "score": 210, "rank": 1 }
       - Notes:
            - Users must be authenticated to receive updates.
            - Implements WebSocket security to prevent unauthorized access.

4. Flow Diagram
   - Execution Flow:
     - User performs an action → API call to update score (POST /scores/update)
     - Server validates request → Checks JWT, verifies user, validates action.
     - Database update → User’s score is increased in the database.
     - Leaderboard recalculation → Server updates the leaderboard if necessary.
     - Broadcast update → Server sends real-time updates via WebSockets.
     - Frontend updates UI → The updated leaderboard is displayed to users.
       - PlantUML Diagram:
            @startuml
             start
             :User performs an action;
             :Send API request to update score (POST /api/scores/update);
             if (Is the request valid?) then (Yes)
                :Server validates JWT & checks user;
                :Update user score in the database;
                :Recalculate leaderboard if needed;
                :Broadcast update via WebSocket;
                :Frontend updates UI;
             else (No)
                :Reject request with error message;
             endif
             stop
            @enduml
    - link diagram: https://www.plantuml.com/plantuml/uml/FP4nRp8n38Rt_0fFd-ucTcxuQ8TAT6XH0Q6E9dafAI6vsZxwznkuWqpMwyTwR6MXncB3ERbRuUPRXL0FEHGvAt4czXPBxjnyZHpeQRKamSy0DR92Gn_OGEgBW9hL-tf3C-xZx1ReR6otdNFnGCrIoOvuZ5yunV2_lMQPcazewwY-wf4BP6opGUbrjw5_v8_m9wL18Tq8RaVvDPasYFbcg37lMJ5n7_2S_92kS087oBwm1AexPI0WJDop50wUrUvdNIBJ3ljryIVO1Br8oOOS9aPfk-mSaeAQjzBUXT_mzZZqDzgH85A4pb3bBzI97EB1gPNUBMfTF-0F
5. Security Considerations
   - Authentication:
     - Use JWT tokens for all score updates.
     - WebSockets require authentication to receive updates.
   - Rate Limiting:
     - Prevent spam requests by setting a limit on score update calls per user.
   - Server-Side Validation:
     - Ensure score increments follow predefined rules.
     - Prevent users from sending arbitrary score values.
   - WebSocket Security:
     - Use authentication to prevent unauthorized connections.
     - Implement disconnect detection for inactive users.
     
6.  Potential Improvements
   - Caching leaderboard results using Redis to reduce database queries.
   - Using Redis Pub/Sub or Socket.io Rooms for efficient real-time updates.
   - Adding user levels & achievements to enhance engagement.
   - Providing detailed logs to monitor suspicious activities.