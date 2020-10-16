var multer = require('multer');
var { genString } = require('../helpers/randomHelper');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        const acceptedExtensions = ["jpeg", "jpg", "png"];
        const mimeparts = file.mimetype.split("/");

        if (mimeparts[1] === undefined) cb("Não foi possível identificar o formato da imagem");
        if (acceptedExtensions.indexOf(mimeparts[1]) === -1) cb(`Tipo da imagem não permitido (${mimeparts[1]})`);

        cb(null, `${Date.now()}_${genString(10)}.${mimeparts[1]}`);
    }
});

var upload = multer({ storage });

exports.upload = async (req, res) => {
    upload.single('avatar')(req, res, err => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        }

        const acceptedExtensions = ["jpeg", "jpg", "png"];

        const file = req.file;
        const mimeparts = file.mimetype.split("/");
        
        if (mimeparts[1] === undefined) {
            return res.status(500).send({
                message: "Não foi possível identificar o formato da imagem"
            });
        }
        
        if (acceptedExtensions.indexOf(mimeparts[1]) === -1) {
            return res.status(400).send({
                message: `Tipo da imagem não permitido (${mimeparts[1]})`
            });
        }
        
        var image = {};
        image.id = `${file.filename}`;
        image.url = `uploads/${image.id}`;

        return res.status(201).send(image);
    });
}
