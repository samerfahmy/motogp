/* Switch to the db */
//use motogp

/* Create the necessary collections */
db.createCollection("predictions")
db.createCollection("races")
db.createCollection("riders")
db.createCollection("users")

/* Create the races documents */
db.getCollection("races").findAndModify({
	query: { location: "Qatar Losail" },
	update: { $set :
		{
	    "location" : "Qatar Losail",
	    "qualifying_start_time" : ISODate("2017-03-25T17:35:00.000Z"),
	    "race_start_time" : ISODate("2017-03-26T18:00:00.000Z")
		}
	},
	upsert: true
})
db.getCollection("races").findAndModify({
	query: { location: "Argentina" },
	update: { $set :
		{
	    "location" : "Argentina",
	    "qualifying_start_time" : ISODate("2017-04-08T17:10:00.000Z"),
			"race_start_time" : ISODate("2017-04-09T19:00:00.000Z")
		}
	},
	upsert: true
})
db.getCollection("races").findAndModify({
	query: { location: "Austin" },
	update: { $set :
		{
	    "location" : "Austin",
	    "qualifying_start_time" : ISODate("2017-04-22T14:10:00-05:00"),
	    "race_start_time" : ISODate("2017-04-23T14:00:00-05:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Jerez Spain" },
	update: { $set :
		{
	    "location" : "Jerez Spain",
	    "qualifying_start_time" : ISODate("2017-05-06T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-05-07T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Le Mans France" },
	update: { $set :
		{
	    "location" : "Le Mans France",
	    "qualifying_start_time" : ISODate("2017-05-21T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-05-22T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Mugello Italy" },
	update: { $set :
		{
	    "location" : "Mugello Italy",
	    "qualifying_start_time" : ISODate("2017-06-03T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-06-04T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Catalunya Spain" },
	update: { $set :
		{
	    "location" : "Catalunya Spain",
	    "qualifying_start_time" : ISODate("2017-06-10T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-06-10T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Assen Netherlands" },
	update: { $set :
		{
	    "location" : "Assen Netherlands",
	    "qualifying_start_time" : ISODate("2017-06-24T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-06-24T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Sachsenring Germany" },
	update: { $set :
		{
	    "location" : "Sachsenring Germany",
	    "qualifying_start_time" : ISODate("2017-07-01T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-07-02T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Brno Czech Republic" },
	update: { $set :
		{
	    "location" : "Brno Czech Republic",
	    "qualifying_start_time" : ISODate("2017-08-05T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-08-06T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Red Bull Ring Austria" },
	update: { $set :
		{
	    "location" : "Red Bull Ring Austria",
	    "qualifying_start_time" : ISODate("2017-08-12T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-08-13T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Silverstone Great Britain" },
	update: { $set :
		{
	    "location" : "Silverstone Great Britain",
	    "qualifying_start_time" : ISODate("2017-08-26T14:10:00+01:00"),
	    "race_start_time" : ISODate("2017-08-27T14:00:00+01:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Misano Italy" },
	update: { $set :
		{
	    "location" : "Misano Italy",
	    "qualifying_start_time" : ISODate("2017-09-09T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-09-10T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Aragon Spain" },
	update: { $set :
		{
	    "location" : "Aragon Spain",
	    "qualifying_start_time" : ISODate("2017-09-23T14:10:00+02:00"),
	    "race_start_time" : ISODate("2017-09-24T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Motegi Japan" },
	update: { $set :
		{
	    "location" : "Motegi Japan",
	    "qualifying_start_time" : ISODate("2017-10-14T14:10:00+09:00"),
	    "race_start_time" : ISODate("2017-10-15T14:00:00+09:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Phillip Island Australia" },
	update: { $set :
		{
	    "location" : "Phillip Island Australia",
	    "qualifying_start_time" : ISODate("2017-10-21T15:10:00+11:00"),
	    "race_start_time" : ISODate("2017-10-22T16:00:00+11:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Sepang Malaysia" },
	update: { $set :
		{
	    "location" : "Sepang Malaysia",
	    "qualifying_start_time" : ISODate("2017-10-28T14:10:00+08:00"),
	    "race_start_time" : ISODate("2017-10-29T15:00:00+08:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Valencia Spain" },
	update: { $set :
		{
	    "location" : "Valencia Spain",
	    "qualifying_start_time" : ISODate("2017-11-11T14:10:00+01:00"),
	    "race_start_time" : ISODate("2017-11-12T14:00:00+01:00")
		}
	},
	upsert: true
});

/* Create the riders documents */
db.getCollection("riders").findAndModify({
	query: { name : "Marc Marquez" },
	update: { $set :
		{
	    "name" : "Marc Marquez",
    	"team" : "Repsol Honda",
    	"manufacturer" : "Honda",
    	"number" : "93"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Andrea Dovizioso" },
	update: { $set :
		{
	    "name" : "Andrea Dovizioso",
    	"team" : "Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "4"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Johann Zarco" },
	update: { $set :
		{
	    "name" : "Johann Zarco",
    	"team" : "Tech 3 Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "5"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Hector Barbera" },
	update: { $set :
		{
	    "name" : "Hector Barbera",
    	"team" : "Avintia Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "8"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Danilo Petrucci" },
	update: { $set :
		{
	    "name" : "Danilo Petrucci",
    	"team" : "Pramac Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "9"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Karel Abraham" },
	update: { $set :
		{
	    "name" : "Karel Abraham",
    	"team" : "Aspar Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "17"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Alvaro Bautista" },
	update: { $set :
		{
	    "name" : "Alvaro Bautista",
    	"team" : "Aspar Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "19"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Sam Lowes" },
	update: { $set :
		{
	    "name" : "Sam Lowes",
    	"team" : "Aprilia",
    	"manufacturer" : "Aprilia",
    	"number" : "22"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Maverick Vinales" },
	update: { $set :
		{
	    "name" : "Maverick Vinales",
    	"team" : "Movistar Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "25"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Dani Pedrosa" },
	update: { $set :
		{
	    "name" : "Dani Pedrosa",
    	"team" : "Repsol Honda",
    	"manufacturer" : "Honda",
    	"number" : "26"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Andrea Iannone" },
	update: { $set :
		{
	    "name" : "Andrea Iannone",
    	"team" : "Suzuki",
    	"manufacturer" : "Suzuki",
    	"number" : "29"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Cal Crutchlow" },
	update: { $set :
		{
	    "name" : "Cal Crutchlow",
    	"team" : "LCR Honda",
    	"manufacturer" : "Honda",
    	"number" : "35"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Bradley Smith" },
	update: { $set :
		{
	    "name" : "Bradley Smith",
    	"team" : "KTM",
    	"manufacturer" : "KTM",
    	"number" : "38"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Aleix Espargaro" },
	update: { $set :
		{
	    "name" : "Aleix Espargaro",
    	"team" : "Aprilia",
    	"manufacturer" : "Aprilia",
    	"number" : "41"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Alex Rins" },
	update: { $set :
		{
	    "name" : "Alex Rins",
    	"team" : "Suzuki",
    	"manufacturer" : "Suzuki",
    	"number" : "42"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Jack Miller" },
	update: { $set :
		{
	    "name" : "Jack Miller",
    	"team" : "Marc VDS",
    	"manufacturer" : "Honda",
    	"number" : "43"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Pol Espargaro" },
	update: { $set :
		{
	    "name" : "Pol Espargaro",
    	"team" : "KTM",
    	"manufacturer" : "KTM",
    	"number" : "44"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Scott Redding" },
	update: { $set :
		{
	    "name" : "Scott Redding",
    	"team" : "Pramac Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "45"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Valentino Rossi" },
	update: { $set :
		{
	    "name" : "Valentino Rossi",
    	"team" : "Movistar Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "46"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Tito Rabat" },
	update: { $set :
		{
	    "name" : "Tito Rabat",
    	"team" : "Marc VDS",
    	"manufacturer" : "Honda",
    	"number" : "53"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Loris Baz" },
	update: { $set :
		{
	    "name" : "Loris Baz",
    	"team" : "Avintia Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "76"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Jonas Folger" },
	update: { $set :
		{
	    "name" : "Jonas Folger",
    	"team" : "Tech 3 Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "94"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Jorge Lorenzo" },
	update: { $set :
		{
	    "name" : "Jorge Lorenzo",
    	"team" : "Ducati",
    	"manufacturer" : "Ducati",
    	"number" : "99"
		}
	},
	upsert: true
});
