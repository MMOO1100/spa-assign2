import express from "express";
import Character from "../schemas/characters.schema.js";

const router = express.Router();

// localhost:3000/api/characters POST
router.post("/characters", async (req, res) => {
//   try {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "invaild request: Name is required" });
    }

    const { name } = req.body;
    const PrevCharacter = await Character.findOne().sort("-characterId").exec();

    if (PrevCharacter && name === PrevCharacter.name) {
      return res.status(400).json({
        message: "Duplicated name: A character with this name already exists",
      });
    }

    const characterId = PrevCharacter ? PrevCharacter.characterId + 1 : 1;
    const createdcharacters = new Character({
      name,
      characterId,
    });

    await createdcharacters.save();

    return res.status(201).json({ characterId });
//   } catch (error) {}

//   console.log("Failed to create character");
//   res.status(500).json({ message: "server error:Failed to create character" });
});

router.delete("/characters/:characterId", async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId, 10);
    const character = await Character
      .findOne({
        characterId,
      })
      .exec();

    if (!character) {
      return res
        .status(404)
        .json({ message: "character with Id ${characterId} not found" });
    }
    await Character.deleteOne({ characterId }).exec();
    return res.status(200).json({ message: "character deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error : failed to delete character" });
  }
});

router.get("/characters/:characterId", async (req, res) => {
  try {
    const characterId = parseInt(req.params.characterId, 10);
    const character = await Character
      .findOne({
        characterId,
      })
      .exec();

    if (!character) {
      return res
        .status(404)
        .json({ message: "character with Id ${characterId} not found" });
    }

    return res.status(200).json({
      name: character.name,
      health: character.health,
      power: character.power,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "server error : failed to delete character" });
  }
});

export default router;