import { Request, Response } from "express";
import archiver from "archiver";
import { PassThrough } from "stream";

export const downloadZip = async (req: Request, res: Response) => {
  const { html, css, js, json } = req.body;

  if (!html || !js) {
     res.status(400).json({
      message: "Missing files",
    });
  }

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=animation.zip");

  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = new PassThrough();

  archive.on("error", (err) => {
    res.status(500).send({ message: "Error creating zip", error: err.message });
  });

  archive.pipe(stream);

  archive.append(html, { name: "index.html" });
  archive.append(css, { name: "style.css" });
  archive.append(js, { name: "script.js" });

  if (json) {
    archive.append(json, { name: "manifest.json" });
  }

  archive.finalize();
  stream.pipe(res);
};
