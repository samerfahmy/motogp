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
	    "qualifying_start_time" : ISODate("2020-03-07T18:00:00+03:00"),
	    "race_start_time" : ISODate("2020-03-08T18:00:00+03:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Buriram Thailand" },
	update: { $set :
		{
	    "location" : "Buriram Thailand",
	    "qualifying_start_time" : ISODate("2020-03-21T15:05:00+07:00"),
	    "race_start_time" : ISODate("2020-03-22T15:00:00+07:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Austin" },
	update: { $set :
		{
	    "location" : "Austin",
	    "qualifying_start_time" : ISODate("2020-04-04T14:10:00-05:00"),
	    "race_start_time" : ISODate("2020-04-05T14:00:00-05:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Argentina" },
	update: { $set :
		{
	    "location" : "Argentina",
	    "qualifying_start_time" : ISODate("2020-04-18T14:10:00-03:00"),
		"race_start_time" : ISODate("2020-04-19T14:00:00-03:00")
		}
	},
	upsert: true
})
db.getCollection("races").findAndModify({
	query: { location: "Jerez Spain" },
	update: { $set :
		{
	    "location" : "Jerez Spain",
	    "qualifying_start_time" : ISODate("2020-05-02T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-05-03T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Le Mans France" },
	update: { $set :
		{
	    "location" : "Le Mans France",
	    "qualifying_start_time" : ISODate("2020-05-16T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-05-17T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Mugello Italy" },
	update: { $set :
		{
	    "location" : "Mugello Italy",
	    "qualifying_start_time" : ISODate("2020-05-30T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-05-31T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Catalunya Spain" },
	update: { $set :
		{
	    "location" : "Catalunya Spain",
	    "qualifying_start_time" : ISODate("2020-06-06T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-06-07T14:30:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Sachsenring Germany" },
	update: { $set :
		{
	    "location" : "Sachsenring Germany",
	    "qualifying_start_time" : ISODate("2020-06-20T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-06-21T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Assen Netherlands" },
	update: { $set :
		{
	    "location" : "Assen Netherlands",
	    "qualifying_start_time" : ISODate("2020-06-27T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-06-28T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Finland" },
	update: { $set :
		{
	    "location" : "Finland",
	    "qualifying_start_time" : ISODate("2020-07-11T15:10:00+03:00"),
	    "race_start_time" : ISODate("2020-07-12T15:00:00+03:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Brno Czech Republic" },
	update: { $set :
		{
	    "location" : "Brno Czech Republic",
	    "qualifying_start_time" : ISODate("2020-08-08T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-08-09T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Red Bull Ring Austria" },
	update: { $set :
		{
	    "location" : "Red Bull Ring Austria",
	    "qualifying_start_time" : ISODate("2020-08-15T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-08-16T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Silverstone Great Britain" },
	update: { $set :
		{
	    "location" : "Silverstone Great Britain",
	    "qualifying_start_time" : ISODate("2020-08-29T14:10:00+01:00"),
	    "race_start_time" : ISODate("2020-08-30T13:00:00+01:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Misano Italy" },
	update: { $set :
		{
	    "location" : "Misano Italy",
	    "qualifying_start_time" : ISODate("2020-09-12T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-09-13T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Aragon Spain" },
	update: { $set :
		{
	    "location" : "Aragon Spain",
	    "qualifying_start_time" : ISODate("2020-10-03T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-10-04T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Motegi Japan" },
	update: { $set :
		{
	    "location" : "Motegi Japan",
	    "qualifying_start_time" : ISODate("2020-10-17T14:10:00+09:00"),
	    "race_start_time" : ISODate("2020-10-18T14:00:00+09:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Phillip Island Australia" },
	update: { $set :
		{
	    "location" : "Phillip Island Australia",
	    "qualifying_start_time" : ISODate("2020-10-24T14:10:00+11:00"),
	    "race_start_time" : ISODate("2020-10-25T15:00:00+11:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Sepang Malaysia" },
	update: { $set :
		{
	    "location" : "Sepang Malaysia",
	    "qualifying_start_time" : ISODate("2020-10-31T14:10:00+08:00"),
	    "race_start_time" : ISODate("2020-11-01T15:00:00+08:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Valencia Spain" },
	update: { $set :
		{
	    "location" : "Valencia Spain",
	    "qualifying_start_time" : ISODate("2020-11-14T14:10:00+00:00"),
	    "race_start_time" : ISODate("2020-11-15T14:00:00+00:00")
		}
	},
	upsert: true
});

/* Create the riders documents */
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
    	"team" : "Reale Avintia Racing",
    	"manufacturer" : "Ducati",
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
	query: { name : "Iker Lecuona" },
	update: { $set :
		{
	    "name" : "Iker Lecuona",
    	"team" : "Tech 3 KTM",
    	"manufacturer" : "KTM",
    	"number" : "27"
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
	query: { name : "Brad Binder" },
	update: { $set :
		{
	    "name" : "Brad Binder",
    	"team" : "KTM",
    	"manufacturer" : "KTM",
    	"number" : "33"
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
	query: { name : "Alex Marquez" },
	update: { $set :
		{
	    "name" : "Alex Marquez",
    	"team" : "Repsol Honda",
    	"manufacturer" : "Honda",
    	"number" : "73"
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
