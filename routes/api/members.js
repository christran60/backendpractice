const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");
// gets all members
router.get("/", (req, res) => {
  res.json(members);
});

// get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); // gives true or false based on whether given id exists or not
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id))); //gets info of whatever specified id in POSTman
  } else {
    res.status(400).json({ msg: "no member with the id of " + req.params.id }); //give error 400 (bad request)
  }
  // res.send(req.params.id) //get any parameter passed in json, so id for this example
});

//create member
router.post("/", (req, res) => {
  const newMember = {
    //creates new member based on requested body's descriptions
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  // ensure name and email is sent
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email" });
  }
  members.push(newMember);
  res.json(members); //sends json to client
// res.send(members)
});

//update member (use put to update something on server)
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id)); // gives true or false based on whether given id exists or not
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: "member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: "no member with the id of " + req.params.id }); //give error 400 (bad request)
  }
  // res.send(req.params.id) //get any parameter passed in json, so id for this example
});

module.exports = router; //required for whatever file you use router on
