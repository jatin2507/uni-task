import express from "express";
import cors from "cors";
import routes from "../routes/index";

function expressloader(app: express.Application) {
    app.use(
        express.json({
            limit: "50mb",
            type: ["application/json", "text/plain"],
        })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(function (req: express.Request, res: express.Response, next: any) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
    });

    app.use("/api", routes);

    app.get("/", (req: express.Request, res: express.Response) => {
        const ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.socket.remoteAddress;
        const toSave = {
            ipAddress: ip,
            time: new Date(),
        };
        res.send(toSave);
    });
}

export default expressloader;
