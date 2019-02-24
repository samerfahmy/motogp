/* Switch to the db */
// use motogp

/* drop collections we want to recreate */
db.predictions.drop()
db.races.drop()
db.riders.drop()

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
	    "qualifying_start_time" : ISODate("2019-03-09T20:00:00+03:00"),
	    "race_start_time" : ISODate("2019-03-10T20:00:00+03:00")
		}
	},
	upsert: true
})
db.getCollection("races").findAndModify({
	query: { location: "Argentina" },
	update: { $set :
		{
	    "location" : "Argentina",
	    "qualifying_start_time" : ISODate("2019-03-30T14:10:00-03:00"),
		"race_start_time" : ISODate("2019-03-31T15:00:00-03:00")
		}
	},
	upsert: true
})
db.getCollection("races").findAndModify({
	query: { location: "Austin" },
	update: { $set :
		{
	    "location" : "Austin",
	    "qualifying_start_time" : ISODate("2019-04-13T14:10:00-05:00"),
	    "race_start_time" : ISODate("2019-04-14T14:00:00-05:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Jerez Spain" },
	update: { $set :
		{
	    "location" : "Jerez Spain",
	    "qualifying_start_time" : ISODate("2019-05-04T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-05-05T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Le Mans France" },
	update: { $set :
		{
	    "location" : "Le Mans France",
	    "qualifying_start_time" : ISODate("2019-05-18T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-05-19T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Mugello Italy" },
	update: { $set :
		{
	    "location" : "Mugello Italy",
	    "qualifying_start_time" : ISODate("2019-06-01T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-06-02T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Catalunya Spain" },
	update: { $set :
		{
	    "location" : "Catalunya Spain",
	    "qualifying_start_time" : ISODate("2019-06-15T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-06-16T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Assen Netherlands" },
	update: { $set :
		{
	    "location" : "Assen Netherlands",
	    "qualifying_start_time" : ISODate("2019-06-29T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-06-30T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Sachsenring Germany" },
	update: { $set :
		{
	    "location" : "Sachsenring Germany",
	    "qualifying_start_time" : ISODate("2019-07-06T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-07-07T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Brno Czech Republic" },
	update: { $set :
		{
	    "location" : "Brno Czech Republic",
	    "qualifying_start_time" : ISODate("2019-08-03T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-08-04T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Red Bull Ring Austria" },
	update: { $set :
		{
	    "location" : "Red Bull Ring Austria",
	    "qualifying_start_time" : ISODate("2019-08-10T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-08-11T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Silverstone Great Britain" },
	update: { $set :
		{
	    "location" : "Silverstone Great Britain",
	    "qualifying_start_time" : ISODate("2019-08-24T14:10:00+01:00"),
	    "race_start_time" : ISODate("2019-08-25T14:00:00+01:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Misano Italy" },
	update: { $set :
		{
	    "location" : "Misano Italy",
	    "qualifying_start_time" : ISODate("2019-09-14T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-09-15T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Aragon Spain" },
	update: { $set :
		{
	    "location" : "Aragon Spain",
	    "qualifying_start_time" : ISODate("2019-09-21T14:10:00+02:00"),
	    "race_start_time" : ISODate("2019-09-22T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Buriram Thailand" },
	update: { $set :
		{
	    "location" : "Buriram Thailand",
	    "qualifying_start_time" : ISODate("2019-10-05T14:10:00+07:00"),
	    "race_start_time" : ISODate("2019-10-06T14:00:00+07:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Motegi Japan" },
	update: { $set :
		{
	    "location" : "Motegi Japan",
	    "qualifying_start_time" : ISODate("2019-10-19T14:10:00+09:00"),
	    "race_start_time" : ISODate("2019-10-20T14:00:00+09:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Phillip Island Australia" },
	update: { $set :
		{
	    "location" : "Phillip Island Australia",
	    "qualifying_start_time" : ISODate("2019-10-26T15:10:00+11:00"),
	    "race_start_time" : ISODate("2019-10-27T16:00:00+11:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Sepang Malaysia" },
	update: { $set :
		{
	    "location" : "Sepang Malaysia",
	    "qualifying_start_time" : ISODate("2019-11-02T14:10:00+08:00"),
	    "race_start_time" : ISODate("2019-11-03T15:00:00+08:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Valencia Spain" },
	update: { $set :
		{
	    "location" : "Valencia Spain",
	    "qualifying_start_time" : ISODate("2019-11-16T14:10:00+01:00"),
	    "race_start_time" : ISODate("2019-11-17T14:00:00+01:00")
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
    	"team" : "KTM",
    	"manufacturer" : "KTM",
    	"number" : "5"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Danilo Petrucci" },
	update: { $set :
		{
	    "name" : "Danilo Petrucci",
    	"team" : "Ducati",
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
    	"team" : "Reale Avintia Racing",
    	"manufacturer" : "Ducati",
    	"number" : "17"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Franco Morbidelli" },
	update: { $set :
		{
	    "name" : "Franco Morbidelli",
    	"team" : "Petronas Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "21"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Maverick Vinales" },
	update: { $set :
		{
	    "name" : "Maverick Vinales",
    	"team" : "Monster Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "12"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Andrea Iannone" },
	update: { $set :
		{
	    "name" : "Andrea Iannone",
    	"team" : "Aprilia",
    	"manufacturer" : "Aprilia",
    	"number" : "29"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Takaaki Nakagami" },
	update: { $set :
		{
	    "name" : "Takaaki Nakagami",
    	"team" : "LCR Honda",
    	"manufacturer" : "Honda",
    	"number" : "30"
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
    	"team" : "Alma Pramac Racing",
    	"manufacturer" : "Ducati",
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
	query: { name : "Valentino Rossi" },
	update: { $set :
		{
	    "name" : "Valentino Rossi",
    	"team" : "Monster Yamaha",
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
    	"team" : "Reale Avintia Racing",
    	"manufacturer" : "Ducati",
    	"number" : "53"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Hafizh Syahrin" },
	update: { $set :
		{
	    "name" : "Hafizh Syahrin",
    	"team" : "Tech 3 KTM",
    	"manufacturer" : "KTM",
    	"number" : "55"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Jorge Lorenzo" },
	update: { $set :
		{
	    "name" : "Jorge Lorenzo",
    	"team" : "Repsol Honda",
    	"manufacturer" : "Honda",
    	"number" : "99"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Fabio Quartararo" },
	update: { $set :
		{
	    "name" : "Fabio Quartararo",
    	"team" : "Petronas Yamaha",
    	"manufacturer" : "Yamaha",
    	"number" : "20"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Joan Mir" },
	update: { $set :
		{
	    "name" : "Joan Mir",
    	"team" : "Suzuki",
    	"manufacturer" : "Suzuki",
    	"number" : "36"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Francesco Bagnaia" },
	update: { $set :
		{
	    "name" : "Francesco Bagnaia",
    	"team" : "Alma Pramac Racing",
    	"manufacturer" : "Ducati",
    	"number" : "63"
		}
	},
	upsert: true
});
db.getCollection("riders").findAndModify({
	query: { name : "Miguel Oliveira" },
	update: { $set :
		{
	    "name" : "Miguel Oliveira",
    	"team" : "Tech 3 KTM",
    	"manufacturer" : "KTM",
    	"number" : "88"
		}
	},
	upsert: true
});
