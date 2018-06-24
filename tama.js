var inquirer = require("inquirer");
var tamas = {};
var activePets = [];
var petContinue;
var petNames = [];
var petNum;



var newTamas = function(newChar){
    inheriChar = newChar.name;
    tamas[inheriChar] = newChar;
}

var digitalPal = function(name, destructoid){
    this.name = name;
    this.sleepy = false;
    this.bored = true;
    this.age = 0;
    this.hungry = false;
    this.dangerPet = destructoid;
    this.feed = function(){
        if(this.hungry === true){
            console.log("That was Taystehh!!");
            this.sleepy = true;
            this.hungry = false;
        } else if (this.hungry === false){
            console.log("Fuck off, I'm shtuffed");
        };
    };
    this.sleep = function(){
        if(this.sleepy === true){
            console.log("Zzzz *SNOORRE* ZzZzZz");
            this.sleepy = false;
            this.increaseAge();
        } else if (this.sleepy === false){
            console.log("BLEGUUUGHGHGH NO! I'M NOT TIRED!");
        };
    };
    this.play = function(){
        if(this.bored === true){
            console.log("Yasss bitch! Let's play!");
            this.bored = false;
        } else if (this.bored === false){
            console.log("nahh, I'm kinda busy");
        }
    };
    this.increaseAge = function(){
        this.age += 1;
        this.bored = true;
        console.log("Happeh Berfdeh bitch! I am now: " + this.age + " year(s) old!!");
    };

    this.newNature = function(){
        petTamer = activePets[petNum];
        if(petTamer.dangerPet){
            petTamer.dangerPet = false;
            console.log(petTamer.name + " has been tamed!");
        } else {
            petTamer.dangerPet = true;
            console.log(petTamer.name + "has become wild and unruly!");
        };
    };
    newTamas(this);
}

newProps = function(ezpz){
    ezpz.outside = false;
    ezpz.palsCry = function(){
        console.log(ezpz.name + "'s NOISE CRY! But cute and smol");
    };
    ezpz.goOutside = function(){
        if(ezpz.outside === false){
            console.log("YAAASSS OUUTTSSEEEERRRD");
            ezpz.outside = true;
        } else if (ezpz.outside === true){
            console.log("lmao we're already outside dipshit");
        }
    };
    ezpz.goInside = function(){
        if(ezpz.outside === true){
            console.log("NUUU REally?! I wanna stay outsi. . . ugh, fine");
            ezpz.outside = false;
        } else if (ezpz.outside === false){
            console.log("You forgot your meds today huh? We're already inside haha");
        };
    };
    if(ezpz.dangerPet === true){
        ezpz.houseCondition = 100;
        ezpz.houseWarning = "House will be destroyed!!";
        ezpz.secondaryNoise = "HREERRERRRROOOAOOOAAAAAARRRR!!";
        ezpz.destroyFurniture = function(){
            if (ezpz.houseCondition === 0){
                return;
            };
            ezpz.houseCondition -= 10;
            console.log("MEREESCREAAAHAHAHA GOODBYE FURNITURE!");
            ezpz.bored = false;
            ezpz.sleepy = true;
        };
        ezpz.buyNewFurniture = function(){
            ezpz.houseCondition += 50;
            console.log("Are you certain about your purchases? *DUN DUN DUNNN*");
        }
    };
};

newPetIn = function(petPass, dangPass){
    var petPass = new digitalPal(petPass, dangPass);
    newProps(petPass);
    activePets.push(petPass);
};

indexFinder = function(petIndPasser){
    petNum = petNames.indexOf(petIndPasser);
};

indexIterating = function(){
    petNames = [];
    for(i = 0; i < activePets.length; i++){
        petNames.push(activePets[i].name);
    }
    if(petContinue === null){
        petSwitching();
    };
};

// var plantDood = new digitalPal("plantDood", false);
// var dragonDood = new digitalPal("dragonDood", true);
// newProps(plantDood);
// newProps(dragonDood);

// console.log(tamas);
// dragonDood.destroyFurniture();
// plantDood.sleep();
// tamas.dragonDood.digitalPal.buyNewFurniture();
cancelNew = function(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Cancel new character?",
            name: "cannedPet"
        }
    ]).then(answer =>{
        if(answer.cannedPet){
            petContinue = true;
            continuousInq();
        } else {
            starterInq();
        };
    });
};

starterInq = function(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is your pet?",
            name: "userPetIn"
        },
        {
            type: "confirm",
            message: "Is your pet dangerous?",
            name: "petDang"
        }
    ]).then(answers => {
        userPet = answers.userPetIn.toLowerCase();
        dangerFloof = answers.petDang;
        petChecker = petNames.indexOf(userPet);
        if(petChecker !== -1){
            console.log("Pet already exists, choose new pet or cancel. To tame pet, type 'new nature' when pet is set or switched.");
            cancelNew();
        } else {
            newPetIn(userPet, dangerFloof);
            // stringPasser = eval(userPet);
            // console.log(typeof stringPasser);
            // stringPasser.sleep();
            petContinue = true;
            indexIterating();
            indexFinder(answers.userPetIn);
            continuousInq();
        };
    });
};

petSwitching = function(){
    console.log("Available pets: " + "'" + petNames.join(", ") + "'" );
    inquirer.prompt([
        {
            type: "input",
            message:`
----------------------------------            
What pet do you want to switch to?`,
            name: "switchScreen"
        }
    ]).then(answer =>{
        indexFinder(answer.switchScreen.toLowerCase()); 
        if(petNum === -1){
            petSwitching();
        } else {
            petContinue = true;
            continuousInq();
        }
    })
};

continuousInq = function(){
    inquirer.prompt([
     {
         type: "input",
         message: `
----------------------------                
What would you like to do? :`,
         name: "petAct"
     }   
    ]).then(action =>{
        actionPet = action.petAct.toLowerCase();
        petSelector = activePets[petNum];
        dangerous = petSelector.dangerPet;
        switch(actionPet){
            case "warning":
                if(dangerous){
                    console.log(petSelector.houseWarning);
                    break;
                } else {
                    console.log("Not Dangerous");
                    break;
                }
            case "feed":
                petSelector.feed();
                break;
            case "play":
                petSelector.play();
                break;
            case "noise":
                if(dangerous){
                    console.log(petSelector.secondaryNoise);
                    break;
                } else {
                    petSelector.palsCry();
                    break;
                }
            case "outside":
                petSelector.goOutside();
                break;
            case "inside":
                petSelector.goInside();
                break;
            case "new nature":
                petSelector.newNature();
                break;
            case "rampage":
                if(dangerous){
                    petSelector.destroyFurniture();
                    break;
                } else {
                    console.log("Aww, your pet made a bunch of cute noises angrily!");
                    break;
                }
            case "repair":
                if(dangerous){
                    petSelector.buyNewFurniture();
                    break;
                } else {
                    console.log("Well, you don't need to repair anything. Your pet is (mostly) an angel.")
                }
            case "sleep":
                petSelector.sleep();
                break;
            case "switch pet":
                petContinue = null;
                indexIterating();
                break;
            case "quit":
                petContinue = false;
                break;
            case "new pet":
                starterInq();
                petContinue = false;
                break;
            case "pet actions":
                console.log("Actions: warning, feed, play, noise, outside, inside, rampage, repair, sleep, new nature, switch pet, new pet, pet actions, quit");
                break;
            default:
                console.log(`
============================================
Choose a valid action, or type "pet actions"
============================================
                `);
        }
        if(petContinue){
            continuousInq();
        }
    });
};

starterInq();


//look into prototypes