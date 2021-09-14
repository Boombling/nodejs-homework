const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
    const { id } = req.params;
    // console.log(req.file);
    const { path: tempPath, originalname } = req.file;
    const uploadPath = path.join(avatarDir, id, originalname);
    try {
        const file = await Jimp.read(tempPath);
        await file.resize(255, 255).write(tempPath);
        await fs.rename(tempPath, uploadPath);
        const avatarURL = `/avatar/${id}/${originalname}`;
        await User.findByIdAndUpdate(id, { avatarURL });
        res.json({
            status: "success",
            code: 200,
            data: {
                avatarURL: avatarURL,
            }
        })
    }
    catch (error) {
        await fs.unlink(tempPath);
        throw error;
    }
};

module.exports = updateAvatar;