import express from "express";
import Resource from "../models/Resource";

const router = express.Router();

// Create a resource
router.post("/", async (req, res) => {
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ error: error.message });
    }
});

// List resources with basic filters
router.get("/", async (_req, res) => {
    try {
        const resources = await Resource.find();
        res.json(resources);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

// Get details of a resource
// @ts-ignore
router.get("/:id", async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: "Resource not found" });
        res.json(resource);
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

// Update resource details
// @ts-ignore
router.patch("/:id", async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) return res.status(404).json({ message: "Resource not found" });
        res.json(resource);
    } catch (error) {
        // @ts-ignore
        res.status(400).json({ error: error.message });
    }
});

// Delete a resource
// @ts-ignore
router.delete("/:id", async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) return res.status(404).json({ message: "Resource not found" });
        res.json({ message: "Resource deleted successfully" });
    } catch (error) {
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
});

export default router;
