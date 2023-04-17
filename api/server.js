// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const cors = require("cors");
const User = require("./users/model");

const server = express();

server.use(express.json());
server.use(cors());

// server.get("/api/users", (req, res) => {
//   const users = User.find();
//   users
//     .then((users) => res.status(200).json(users))
//     .catch((err) =>
//       res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" })
//     );
// });

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.post("/api/users", async (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  if (name && bio) {
    try {
      const newUser = await User.insert(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.remove(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  if (bio && name) {
    try {
      const updatedUser = await User.update(req.params.id, req.body);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
    } catch (err) {
      res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
    }
  } else {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  }
});

module.exports = { server }; // SERVERINIZI EXPORT EDİN {}
