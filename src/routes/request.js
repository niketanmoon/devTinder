import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { ConnectionRequestModel as ConnectionRequest } from "../models/connectionRequest.js";
import { User } from "../models/user.js";

export const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params?.toUserId;
      const status = req.params?.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: `Invalid status type: ${status}` });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User does not exist!" });
      }

      // If there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection Request already exist!",
        });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message:
          status === "ignored"
            ? "Connection request ignored successfully"
            : "Connection requst sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found!" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();

      return res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);
