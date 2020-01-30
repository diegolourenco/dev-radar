const axios = require("axios");
const Dev = require("./../models/Dev");
const parseStringAsArray = require("./../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },
  async show(request, response) {
    const { id } = request.params;

    const dev = await Dev.findById(id);

    return response.json(dev);
  },
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar conexões que estão no máximo 10km de distância
      // E que o novo dev tenha pelo menos uma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  },
  async update(request, response) {
    const { id } = request.params;
    const dev = request.body;

    const techs = parseStringAsArray(dev.techs);
    const location = {
      type: "Point",
      coordinates: [dev.longitude, dev.latitude]
    };

    const devUpdated = await Dev.findByIdAndUpdate(id, {
      ...dev,
      techs,
      location
    });

    return response.json(devUpdated);
  },
  async destroy(request, response) {
    const { id } = request.params;

    const dev = await Dev.findByIdAndDelete(id);

    return response.json(dev);
  },
  async deleteAll(request, response) {
    await Dev.remove();
    const count = await Dev.count();
    return response.json({ message: "Devs excluídos", count });
  }
};
