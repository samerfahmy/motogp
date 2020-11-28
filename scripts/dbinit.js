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
	query: { location: "Jerez 1" },
	update: { $set :
		{
	    "location" : "Jerez 1",
	    "qualifying_start_time" : ISODate("2020-07-18T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-07-19T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Jerez 2" },
	update: { $set :
		{
	    "location" : "Jerez 2",
	    "qualifying_start_time" : ISODate("2020-07-25T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-07-26T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Czech" },
	update: { $set :
		{
	    "location" : "Czech",
	    "qualifying_start_time" : ISODate("2020-08-08T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-08-09T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Austria 1" },
	update: { $set :
		{
	    "location" : "Austria 1",
	    "qualifying_start_time" : ISODate("2020-08-15T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-08-16T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Austria 2" },
	update: { $set :
		{
	    "location" : "Austria 2",
	    "qualifying_start_time" : ISODate("2020-08-22T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-08-23T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Misano 1" },
	update: { $set :
		{
	    "location" : "Misano 1",
	    "qualifying_start_time" : ISODate("2020-09-12T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-09-13T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Misano 2" },
	update: { $set :
		{
	    "location" : "Misano 2",
	    "qualifying_start_time" : ISODate("2020-09-19T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-09-20T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Barcelona" },
	update: { $set :
		{
	    "location" : "Barcelona",
	    "qualifying_start_time" : ISODate("2020-09-26T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-09-27T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "France" },
	update: { $set :
		{
	    "location" : "France",
	    "qualifying_start_time" : ISODate("2020-10-10T14:10:00+00:00"),
	    "race_start_time" : ISODate("2020-10-11T14:00:00+00:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Aragon 1" },
	update: { $set :
		{
	    "location" : "Aragon 1",
	    "qualifying_start_time" : ISODate("2020-10-17T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-10-18T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Aragon 2" },
	update: { $set :
		{
	    "location" : "Aragon 2",
	    "qualifying_start_time" : ISODate("2020-10-24T14:10:00+02:00"),
	    "race_start_time" : ISODate("2020-10-25T14:00:00+02:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Valencia 1" },
	update: { $set :
		{
	    "location" : "Valencia 1",
	    "qualifying_start_time" : ISODate("2020-11-07T14:10:00+01:00"),
	    "race_start_time" : ISODate("2020-11-08T14:00:00+01:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Valencia 2" },
	update: { $set :
		{
	    "location" : "Valencia 2",
	    "qualifying_start_time" : ISODate("2020-11-14T14:10:00+01:00"),
	    "race_start_time" : ISODate("2020-11-15T14:00:00+01:00")
		}
	},
	upsert: true
});
db.getCollection("races").findAndModify({
	query: { location: "Portimao" },
	update: { $set :
		{
	    "location" : "Portimao",
	    "qualifying_start_time" : ISODate("2020-11-21T14:10:00+00:00"),
	    "race_start_time" : ISODate("2020-11-22T14:00:00+00:00")
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
