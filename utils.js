module.exports = {

	/**
	 * Checks if a prediction has duplicates
	 * Returns true if duplicates are found
	 */
	checkPredictionForDuplicates: function(prediction) {
		var selectionsArray = []
    selectionsArray[0] = this.checkForEmpty(prediction.race_pos_1)
    selectionsArray[1] = this.checkForEmpty(prediction.race_pos_2)
    selectionsArray[2] = this.checkForEmpty(prediction.race_pos_3)

    for (var i=0; i<selectionsArray.length; i++) {
      for (var j=0; j<selectionsArray.length; j++) {
        if (i != j && selectionsArray[i] === selectionsArray[j] && selectionsArray[i] != null) {
          // duplicate selection, return an error
          return true;
        }
      }
    }

    return false;
	},

	/**
	 * Check if the date has already passed
	 */
	checkExpired: function(date) {
  	var srcDate = Date.parse(date)
  	
  	return srcDate <= Date.now()
  },

  checkForEmpty: function(src) {
    if (src != null && src.trim().length === 0) {
      return null
    }
    return src
  }
	
}