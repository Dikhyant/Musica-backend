import express from "express";
import { albums, songs } from "../controllers/Get";
import { api } from "./ApiPaths";

export const router = express.Router();

router.get("/" + api.ALBUMS, albums);
router.get("/" + api.SONGS, songs);