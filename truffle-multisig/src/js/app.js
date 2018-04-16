App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('MultiSigWallet.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);


      App.getContractAddr();
      App.getContractBalance();
      App.getContractOwners();
      // Use our contract to retrieve and mark the adopted pets
      //return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
    $(document).on('click', '.btn-submit', App.handleSubmit);
    $(document).on('click', '.btn-getid', App.handleGetTid);
    $(document).on('click', '.btn-getcount', App.handleGetTransactionCount);
    $(document).on('click', '.getTransactionById .btn-query', App.handleGetTransactionById);
    $(document).on('click', '.signTransactionById .btn-sign', App.handleSigTid);
    $(document).on('click', '.isConfirmed .btn-query', App.handleisConfirmed);
    $(document).on('click', '.executeTransaction .btn-execute', App.handleExecute);
  },

  getContractAddr: function() {
    App.contracts.Adoption.deployed().then(function(inst){
      $(".contractInfo #addr").text(`contract address: ${inst.address}`)
    })
  },

  getContractOwners: function() {
    App.contracts.Adoption.deployed().then(function(inst){
      inst.owners.call(0)
    }).then(function(resp){
      $(".contractInfo #owners").text(resp)
    }).catch(function(err){
      $(".contractInfo #owners").text(err)
    })
  },

  getContractBalance: function() {
    App.contracts.Adoption.deployed().then(function(inst){
      let address = inst.address
      web3.eth.getBalance(address, function(err, resp){
        if(err !=  undefined){
          $(".contractInfo #addr").text(`get balance error message: ${err}`)
        }else{
          $(".contractInfo #balance").text(`balance: ${resp}`)
        }
      })
    })
  },

  submitTransaction: function(toaddr, value, memo) {
    App.contracts.Adoption.deployed().then(function(inst){
      return inst.submitTransaction(toaddr, value,memo);
    }).then(function(result){
      // $(".submitTransaction .result").text(JSON.stringify(result, null, 2));
      $(".submitTransaction .result").text(`tx: ${result.tx}`);
    }).catch(function(result){
      $(".submitTransaction .result").text(result);
    })
  },

  handleGetTransactionCount: function(event) {
    event.preventDefault();
    return App.getTransactionCount();
  },

  getTransactionCount: function() {
    let pendingF = $(".transactionCount #checkBox1").is(":checked")
    let completeF = $(".transactionCount #checkBox2").is(":checked")
    App.contracts.Adoption.deployed().then(function(inst){
      console.debug(`pending: ${pendingF}, complete: ${completeF}`)
      return inst.getTransactionCount.call(pendingF,completeF);
    }).then(function(result){
      $(".transactionCount .result").text(result);
    }).catch(function(result){
      $(".transactionCount .result").text(result);
    })
  },

  getBalance: function(){
    //web3.eth.getBalance("0x9248ba7489a7381af5fac374db863cd944b6cca9", function(a,e){console.log(a,e)})
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      console.log(account);
    });
  },

  getTransactionId: function(){
    let fromId = $(".getTransactionId #from").val();
    let toId = $(".getTransactionId  #to").val();
    let pendingF = $(".getTransactionId #checkBox1").is(":checked")
    let completeF = $(".getTransactionId #checkBox2").is(":checked")
    App.contracts.Adoption.deployed().then(function(inst){
      return inst.getTransactionIds.call(fromId, toId, pendingF, completeF);
    }).then(function(result){
      $(".getTransactionId .result").text(result);
    }).catch(function(result){
      $(".getTransactionId .result").text(result);
    })
  },

  handleGetTransactionById: function(event) {
    event.preventDefault();
    return App.getTransactionById();
  },

  getTransactionById: function() {
    let tId = $(".getTransactionById #tid").val();
    App.contracts.Adoption.deployed().then(function(inst){
      return inst.getTransactionById.call(tId);
    }).then(function(result){
      $(".getTransactionById .result").text(result);
    }).catch(function(result){
      $(".getTransactionById .result").text(result);
    })
  },

  handleAdopt: function(event) {
    event.preventDefault();
    return App.getBalance();
  },

  handleSubmit: function(event) {
    event.preventDefault();
    let toaddr = $(".submitTransaction #sendto").val();
    let value = $(".submitTransaction #value").val();
    value = parseInt(value);
    let memo = $(".submitTransaction #memo").val();
    return App.submitTransaction(toaddr, value, memo);
  },

  handleGetTid: function(event) {
    event.preventDefault();
    return App.getTransactionId();
  },

  handleSigTid: function(event) {
    event.preventDefault();
    return App.confirmTransaction();
  },

  confirmTransaction: function() {
    let tId = $(".signTransactionById #tid").val();
    App.contracts.Adoption.deployed().then(function(inst){
      return inst.confirmTransaction(tId);
    }).then(function(result){
      // $(".signTransactionById .result").text(JSON.stringify(result, null, 2));
      $(".signTransactionById .result").text(`tx: ${result.tx}`);
    }).catch(function(result){
      $(".signTransactionById .result").text(result);
    })
  },

  isConfirmedFunt: function() {
    let tId = $(".isConfirmed #tid").val();
    App.contracts.Adoption.deployed().then(function(inst){
      return inst.isConfirmed.call(tId);
    }).then(function(result){
      $(".isConfirmed .result").text(result);
    }).catch(function(result){
      $(".isConfirmed .result").text(result);
    })
  },

  handleisConfirmed: function(event) {
    event.preventDefault()
    return App.isConfirmedFunt()
  },

  handleExecute: function(event) {
    event.preventDefault()
    return App.executeTransaction()
  },

  executeTransaction: function() {
    let tId = $(".executeTransaction #tid").val();
    App.contracts.Adoption.deployed().then(function(inst){
      return inst.executeTransaction(tId);
    }).then(function(result){
      // $(".executeTransaction .result").text(JSON.stringify(result, null, 2));
      $(".executeTransaction .result").text(`tx: ${result.tx}`);
    }).catch(function(result){
      $(".executeTransaction .result").text(result);
    })
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
