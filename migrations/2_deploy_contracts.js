var PrevencionDesastres = artifacts.require("./PrevencionDesastres.sol");

module.exports = function(deployer) {
  deployer.deploy(PrevencionDesastres);
};
