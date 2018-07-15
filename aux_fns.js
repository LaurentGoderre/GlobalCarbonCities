//----------
// General
//----------

function format_idName(city) {
  return idName = city.replace(/\s/g, '_')
                 .replace(/\(/g, '')
                 .replace(/\)/g, '')
                 .replace(/\'/g, '')
                 .replace(/\,/g, '')
                 .replace(/\&/g, '');
}

function setupData(ghg){
  data_GHG = ghg.map(function(d) {
    //each d is a line of the csv file represented as a json object
    //use + only for integers, not floats or strings

    city = d['city']
    region = d['Region']
    cityLocation = [ +d['Longitude (others) [degrees]'] -360, +d['Latitude (others) [degrees]']]
    country = d.Country
    popn = +d['Population (others)']
    area = d['City area (others) [km2]']
    totalEmissions = d['Total emissions (CDP) [tCO2-eq]'] 
    scope1 = d['Scope-1 GHG emissions [tCO2 or tCO2-eq]']
    measurementYear = d['Year of emission']
    GDP = d['GDP-PPP (others) [$BN]']
    scope1_cap = +d['S1 per capita'] //will be sorted incorrectly without the '+'
    //scope1_cap = d['Scope-1 GHG emissions [tCO2 or tCO2-eq]']/+d['Population (others)']
    scope1_gdp = d['Scope-1 GHG emissions [tCO2 or tCO2-eq]']/d['GDP-PPP (others) [$BN]']
    GDP_cap = d["GDP-PPP (others) [$BN]"]/d["Population (others)"]*Math.pow(10,9)
    pop_density = +d['Population (others)']/d['City area (others) [km2]']
    HDD155C = +d["HDD 15.5C (clim) [degrees C \xc3\x97 days]"] 
    CDD23C = +d["CDD 23C (clim) [degrees C \xc3\x97 days]"] 
    diesel_price = d["Diesel price 2014 (others) [USD/liter]"]
    gas_price = +d["Gasoline price (GEA+) [USD/liter]"]
    HH = +d["Household size (others) [people/household]"]
    methodology_num = +d['MethodNum'] //1-6 for 6 protocols in total
    methodology_details = d['Methodology details (CDP)']
    delta_emissions = d['Increase/Decrease from last year (CDP)'] //string
    delta_emissions_reason = d['Reason for increase/decrease in emissions (CDP)']//string

    //Urban Areas
    UA_cluster = +d['Urban area name (UEX)']
    //low_BUA_1990 = +d['Low BUA - 1990 (UEX) [km2]']
    //low_BUA_2000 = +d['Low BUA - 2000 (UEX) [km2]']
    low_BUA_2014 = +d['Low BUA - 2014 (UEX) [km2]']
    //high_BUA_1990 = +d['High BUA - 1990 (UEX) [km2]']
    //high_BUA_2000 = +d['High BUA - 2000 (UEX) [km2]']
    high_BUA_2014 = +d['High BUA - 2014 (UEX) [km2]']    
    //low_BUApc_1990 = +d['Low BUA % - 1990 (UEX) [percent]']*100
    //low_BUApc_2000 = +d['Low BUA % - 2000 (UEX) [percent]']
    low_BUApc_2014 = +d['Low BUA % - 2014 (UEX) [percent]']
    //high_BUApc_1990 = +d['High BUA % - 1990 (UEX) [percent]']*100
    //high_BUApc_2000 = +d['High BUA % - 2000 (UEX) [percent]']*100
    high_BUApc_2014 = +d['High BUA % - 2014 (UEX) [percent]']*100
    //low_BUA_pdensity_1990 = +d['Low BUA population density - 1990 (UEX) [people/km2]']
    // low_BUA_pdensity_2000 = +d['Low BUA population density - 2000 (UEX) [people/km2]']
    low_BUA_pdensity_2014 = +d['Low BUA population density - 2014 (UEX) [people/km2]']
    //high_BUA_pdensity_1990 = +d['High BUA population density - 1990 (UEX) [people/km2]']
    //high_BUA_pdensity_2000 = +d['High BUA population density - 2000 (UEX) [people/km2]']
     high_BUA_pdensity_2014 = +d['High BUA population density - 2014 (UEX) [people/km2]']

    //traffic and socio-economic indices
    inrix_congestion = +d['Average congestion rate (INRIX) [percent]']
    inrix_idx = +d['INRIX congestion index (INRIX) [dimensionless]']
    inrix_hours = +d['Peak hours spent in congestion (INRIX) [hours]']
    inrix_rank = +d['Congestion rank (INRIX) [dimensionless]']

    tomtom_congestion = +d['Congestion Level (TomTom)']
    tomtom_rank = +d['Congestion rank (TomTom) [dimensionless]']
    tomtom_congestion_change = +d['Congestion change (TomTom) [\xc3\x97 100 percent]']
    tomtom_am_peak = +d['Morning peak (TomTom) [percent]']
    tomtom_pm_peak = +d['Evening peak (TomTom) [percent]']

    iese_human = +d['Human capital (IESE) [dimensionless]']
    iese_cohesion = +d['Social cohesion (IESE) [dimensionless]']
    iese_economy = +d['Economy (IESE) [dimensionless]']
    iese_management = +d['Public management (IESE) [dimensionless]']
    iese_gov = +d['Governance (IESE) [dimensionless]']
    iese_env = +d['Environment (IESE) [dimensionless]']
    iese_transport = +d['Mobility and transportation (IESE) [dimensionless]']
    iese_urban = +d['Urban planning (IESE) [dimensionless]']
    iese_intl = +d['International impact (IESE) [dimensionless]']
    iese_tech = +d['Technology (IESE) [dimensionless]']
    iese_cimi = +d['CIMI (IESE) [dimensionless]']
    iese_cimi_rank = +d['CIMI ranking (IESE) [dimensionless]']


    idName = format_idName(d.city);

    cityName_array.push(city)
   
    return {      
      "city": city,
      "idName": idName,
      "country": country,
      "region": region,
      "cityLocation": cityLocation,
      "total emissions": totalEmissions,
      "Population": popn,
      "population density": pop_density,
      "area": area,
      "Scope1": scope1,
      "Measurement year": measurementYear,
      "per capita": scope1_cap,
      "per GDP": scope1_gdp,      
      "GDP": GDP,
      "GDP/capita": GDP_cap,
      "HDD 15.5C": HDD155C,
      "CDD 23C": CDD23C,
      "diesel price": diesel_price,
      "gas price": gas_price,
      "household size": HH,
      "methodology": methodology_num,
      "methodology details": methodology_details,
      "change in emissions": delta_emissions,
      "reason for change": delta_emissions_reason,
      "low BUA (2014)": low_BUA_2014,
      "low BUA % (2014)": low_BUApc_2014,
      "high BUA (2014)": high_BUA_2014,     
      "high BUA % (2014)": high_BUApc_2014,
      "low BUA density (2014)": low_BUA_pdensity_2014,
      "high BUA density (2014)": high_BUA_pdensity_2014,
      "Avg congestion rate [%] (INRIX)": inrix_congestion,
      "congestion level (INRIX)": inrix_idx,
      "Peak hours spent in congestion (INRIX)": inrix_hours,
      "Congestion rank (INRIX)": inrix_rank,
      "congestion level [%] (TomTom)": tomtom_congestion,
      "World Rank (TomTom)": tomtom_rank,
      "Congestion change [%] (TomTom)": tomtom_congestion_change,
      "Morning peak increase [%] (TomTom)": tomtom_am_peak,
      "Evening peak increase [%] (TomTom)": tomtom_pm_peak,
      "Human Capital index (IESE)": iese_human,
      "Social Cohesion index (IESE)": iese_cohesion,
      "Economy index (IESE)": iese_economy,
      "Public Management index (IESE)": iese_management,
      "Governance index (IESE)": iese_gov,
      "Environment index (IESE)": iese_env,
      "Mobility and Transportation index (IESE)": iese_transport,
      "Urban Planning index (IESE)": iese_urban,
      "International Impact index (IESE)": iese_intl,
      "Technology index (IESE)": iese_tech,
      "Cities in Motion Index (IESE)": iese_cimi
    };
  })

} // ./setupData()

// Reset elements to original style before selection
function resetElements() {
  //reset bar opacity
  d3.selectAll(".bar")
    .style("fill-opacity", 1)
    .style("stroke", "none");


  //clear previously highlighted country
  d3.selectAll(".countries").selectAll("path")
    .style("stroke","#555")
    .style("stroke-width", 1)
    .style("fill", countryColour)
    .style("opacity", 1);

  //reset opacity of world cites and map
  d3.selectAll(".worldcity").style("fill-opacity", 1)
    .style("stroke-opacity", 1);
  d3.selectAll(".countries").selectAll("path").style("opacity", 1) ;
  d3.selectAll(".worldcity")
    .attr("stroke-width", 1)
    .attr("stroke-opacity", 1);   
}

//----------------------------------------------
// Functions for map
//----------------------------------------------
function highlightCountry(countryName, idName, dataObj)  {
  console.log('here: ', dataObj.find(x => x.idName.includes(idName)).region )
  var matchColour = regionColourMap[
                        dataObj.find(x => x.idName.includes(idName)).region
                      ];

  if (countryName === "South Africa") {
      d3.select("#mapSouth Africa")
        .style("stroke-width", 4)
        // .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);
        .style("stroke", "#555");
  }
  else {
    d3.select("#map" + countryName)
      .style("stroke-width", 4)
      .style("stroke", "#555")
      .style("stroke-opacity", 1);
      // .style("stroke", matchColour === "#A6D4FF" ? "blue" : matchColour);

    // d3.selectAll(".countries")
    //   .selectAll("path:not(#map" + countryName + ")")
    //   .style("opacity", 0.3);
  }
}

//----------------------------------------------
// Functions for emissionsBarChart()
//----------------------------------------------

//...............................
// barChart data fns

//concatenate geogroups together, separated by a gap
function fn_concat (barChartGroup, geogroupArray, this_dim) {
  objArray = [];
  count = 0; //for gap id labels
  
  for (idx=0; idx < geogroupArray.length; idx++) {

    //Extract data by region
    ghg_extract = sortByRegion(geogroupArray[idx]);

    //Sort by this_dim in descending order
    ghg_extract.sort((a, b) => d3.descending(a[this_dim], b[this_dim]));

  //--------------
    //Special cases that do not fit on scale
    //Reduce bar height and indicate true value graphically on the chart
    if (geogroupArray[idx] === "groupEurope" && this_dim === "per capita") {
      var selectedCity = data_GHG.find(x => x.city === "Rotterdam");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapRotterdam === 0) {
        //rotterdamEmissionsPerCap = formatDecimalSci(selectedCity[label_dataPerCap]);
        storeFlagCapRotterdam = 1;
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
      }      
      
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.1;
    } 

    else if (geogroupArray[idx] === "groupLatinAmer" && this_dim === "per capita") {     
      var selectedCity = data_GHG.find(x => x.city === "León");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapLeon === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapLeon = 1;
      }
      
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 11;
    } 
    else if (geogroupArray[idx] === "groupSAsia" && this_dim === "per capita") {     
      var selectedCity = data_GHG.find(x => x.city === "Gandhinagar");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapGandhi === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapGandhi = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 11;
    } 

    else if (geogroupArray[idx] === "groupSEAsia" && this_dim === "per capita") {     
      var selectedCity = data_GHG.find(x => x.city === "Quezon");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapQuezon === 0) {        
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapQuezon = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.1;
    } else if (geogroupArray[idx] === "groupEastAsia" && this_dim === "per capita") {     
      var selectedCity = data_GHG.find(x => x.city === "Incheon");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapIncheon === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapIncheon = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.99;

      //Kaohsiung
      var selectedCity = data_GHG.find(x => x.city === "Kaohsiung");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapKaohsiung === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapKaohsiung = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.99;

      //Yilan
      var selectedCity = data_GHG.find(x => x.city === "Yilan");
      
      //Store actual value for later display. Store only once!!!
      if (storeFlagCapYilan === 0) {
        offscaleEmissionsDict[selectedCity.city] = [formatDecimalSci(selectedCity[label_dataPerCap])];
        storeFlagCapYilan = 1;
      }
      //Assign a smaller value FOR SCALE PURPOSES ONLY
      selectedCity[label_dataPerCap] = 9.99;
    }
    

  //--------------
    //Concatenate with a gap obj in between
    if (idx % 2 == 0) {
      objArray = objArray.concat(ghg_extract);
    } 
    else {
      objArray = objArray.concat(
        [{ "city":"gap" + barChartGroup + count,
           "region": barChartGroup,
           "per capita":0, 
           "per GDP": 0 }]
      );
      count++;
    }
  //--------------  

  } //.for

  

  //save cityOrder
  if (this_dim === "per capita") {
    if (barChartGroup === "groupEastAsia") cityOrder_row1 = objArray.map(x => x["city"]);
    else if (barChartGroup === "class_groupNAmer") cityOrder_row2 = objArray.map(x => x["city"]);
    else if (barChartGroup === "class_groupEuropeSEAsia") cityOrder_row3 = objArray.map(x => x["city"]);
  }

  return objArray;
}

//Abbreviate city name in x-axis
function fn_abbr(d) {
  if (d.indexOf(', ') >= 0) abbr = d.substring(0,3);
  else if (d.indexOf(' ') >= 0) abbr = d.match(/\b\w/g).join(' ');
  else abbr = d.substring(0,4);

  return abbr;
}

function sortByRegion(region, this_dim) {

  ghg_byRegion = [];
  data_GHG.forEach(function (d) {
    if (regionDict[d.region] === region && d[this_dim] != "") ghg_byRegion.push(d);
  });

  return ghg_byRegion;
}


//...............................
// barChart updates

function fn_colour_barChart (attrFlag, attrValue) {
  if (attrFlag === "none") return choose_colourArray[attrFlag][0];
  else if (attrFlag === "methodology") {//integers from 1-5, no mapping needed
    return colour_methodNum[attrValue];
  } else if (attrFlag === "change in emissions") {
    return choose_colourArray[attrFlag][ emissionsChangeDict[attrValue] ];
  } else {
     
    colourmapDim = fn_colourmapDim(attrFlag);

    //plot missing data in light gray
    if (attrFlag === "HDD 15.5C" || attrFlag === "CDD 23C") {return colourmapDim(attrValue);} //zeros are real
    else {return attrValue === 0 ? "#E6E8E3" : colourmapDim(attrValue);}
  } 
}
function fn_colourmapDim (attrFlag) {

  dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];

  //colour map to take data value and map it to the colour of the level bin it belongs to
  colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
            .domain([dimExtent[0], dimExtent[1]])
            .range(choose_colourArray[attrFlag]);

  return colourmapDim;
}
function fn_barChartLegend (attrFlag) {

  //initialize legend rects SVG, g and text nodes for first menu selection
  if (! d3.select("#barChartLegend").select("svg").attr("width")) {
   
    //rect SVG
    var margin = {top: 7, right: 0, bottom: 0, left: 20};
    var svg_width = 480 - margin.left - margin.right,
        svg_height = 35 - margin.top - margin.bottom;

    var svgCB = d3.select("#barChartLegend").select("svg")
      .attr("width", svg_width)
      .attr("height", svg_height)
      .style("vertical-align", "middle");

    //Create the g nodes
    var rects = svgCB.selectAll('rect')
            .data(choose_colourArray[attrFlag])
            .enter()
            .append('g');

    //Append rects onto the g nodes and fill according to attrFlag
    var rect_dim = 15;
    var appendedRects = rects.append("rect")
                  .attr("width", rect_dim)
                  .attr("height", rect_dim)
                  .attr("y", 5)
                  .attr("x", function (d, i) {
                    return 41 + i * 80;
                  })
                  .attr("fill", function (d, i) {
                    return choose_colourArray[attrFlag][i];
                  });

    //Append empty text nodes to initialize
    rects.append("text")
         .text("")
         .style("fill","#565656")
         .style("stroke", "none")
         .style("font-size", "11px");

  }  //end initialization of rects and their g-nodes

  //----------------------------------------------------------
  //Rects already exist. Update colours according to attrFlag.

  //define colour bar for numerical attributes
  if (attrFlag != "methodology" || attrFlag != "none") {  
    dimExtent = [dimExtentDict[attrFlag][0], dimExtentDict[attrFlag][1]];
    //difference between max and min values of selected attribute
    delta = ( dimExtent[1] - dimExtent[0] )/num_levels;
    
    console.log("delta: ", delta)
    console.log("dimExtent: ", dimExtent)
    console.log("num_levels: ", num_levels)

    cb_values=[]; //clear
    for (idx=0; idx < num_levels; idx++) {
      if (attrFlag === "diesel price" || attrFlag === "gas price" ||
          attrFlag === "area" || attrFlag === "HDD 15.5C" || attrFlag === "CDD 23C" ||
          attrFlag === "low BUA (2014)" || attrFlag === "high BUA (2014)" ||
          attrFlag === "low BUA density (2014)" || attrFlag === "Measurement year" ||
          attrFlag === "Congestion rank (INRIX)" || attrFlag === "World Rank (TomTom)" ||
          attrFlag === "Cities in Motion Index (IESE)") {
        console.log('idx: ', idx)
        console.log('idx*delta: ', dimExtent[0] + idx*delta)
        cb_values.push( Math.floor(dimExtent[0] + idx*delta) );
      }
      else if (attrFlag === "low BUA % (2014)" || attrFlag === "high BUA % (2014)") {
        //delta = Math.round(delta);
        cb_values.push( 20 + idx*20 );
      }
      else {
        delta = Math.round(delta/1000)*1000;
        console.log("attrFlag here: ", attrFlag)
        console.log("delta: ", delta)
        cb_values.push(Math.round((dimExtent[0] + idx*delta)/1000)*1000);
      }
    }
    console.log("cb_values: ", cb_values)
    console.log("choose_colourArray[attrFlag]: ", choose_colourArray[attrFlag])

    //colour map to take data value and map it to the colour of the level bin it belongs to
    var colourmapDim = d3.scaleQuantize()  //d3.scale.linear() [old d3js notation]
              .domain([dimExtent[0], dimExtent[1]])
              .range(choose_colourArray[attrFlag]); 
  } //cb_array

  //fill rects. Do not display any rects for "None" menu item.
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .attr("fill", function (i, j) {
      return choose_colourArray[attrFlag][j];
    })
    .style("display", function () {
      return (attrFlag === "none") ? "none" : "inline";
    });

  //add text node to rects
  d3.select("#barChartLegend")
    .selectAll("text")
    .text(function (i, j) {
      if (attrFlag === "methodology" || attrFlag === "change in emissions") {
        updateText = choose_textArray[attrFlag][j];
      } else {
        console.log("cb_values format: ", cb_values[j] )

        if (attrFlag === "diesel price" || attrFlag === "gas price" || attrFlag === "Measurement year") {
          firstValue = cb_values[1];
          nextValues = cb_values[j];
        } else if (attrFlag === "low BUA % (2014)" || attrFlag === "high BUA % (2014)") {
          firstValue = 20;
          nextValues = cb_values[j-1];
        } else {
          firstValue = formatDecimalk(cb_values[1]);
          nextValues = formatDecimalk(cb_values[j]);
        }

        if (j === 0) updateText = "< " + firstValue;
        else updateText = "> " + nextValues;
      }
      return updateText;
    })
    .attr("y", 18)
    .attr("x", function (d, i) {
      if (attrFlag === "methodology") xpos = [14,74,172,251,325,386];
      else if (attrFlag === "Measurement year") xpos = [0,80,160,240,320, 280+120];
      else if (attrFlag === "Population") xpos = [2,81,161,241,321,402];
      else if (attrFlag === "population density") xpos = [4,75,147,217,288,333];
      else if (attrFlag === "GDP/capita") xpos = [7,77,146,216,281,333];
      else if (attrFlag === "diesel price" || 
               attrFlag === "gas price") xpos = [4,75,145,215,285,333];
      else if (attrFlag === "low BUA % (2014)" ||
               attrFlag === "high BUA % (2014)") xpos = [13,84,153,224,295,333];
      else xpos = [3,82,162,241,321,403]; 
      return xpos[i];
    })
    .style("display", function () {
      return (attrFlag === "none") ? "none" : "inline";
    });

  
}

function fn_legendRectTooltip(attrFlag) {
  //svg crated in fn_barChartLegend()
  var svgCB = d3.select("#barChartLegend").select("svg");

  //tooltip for legend rects  
  var tool_tip = d3.tip()
      .attr("class", function () {
        if (attrFlag != "methodology") {
          return "d3-tip-deactive";
        }
        else return "d3-tip";
      })
      .offset([-10, 0])
      .html(function (d, i) {
        if (attrFlag != "methodology") {return "";}
        else {
          return "<b>" + Object.keys(protocolDict)[i] + "</b>" + ": "
                     + Object.values(protocolDict)[i];
        }
      });
  svgCB.call(tool_tip);

  //select rects and call tooltip
  d3.select("#barChartLegend").select("svg")
    .selectAll('rect')
    .on('mouseover', tool_tip.show)
    .on('mouseout', tool_tip.hide);
}

//...............................
// barChart visual interactivity

//Enlarge x-axis labels and reset
function fn_enlargeName(geogroup_name, cityName) {
  idName = format_idName(cityName);

  //Enlarge city label of selected bar
  newSize="14px";
  //Need different sizes on account of the vieweBox scale stretching
  if (geogroup_name === "groupEuropeSEAsia" || geogroup_name === "groupLatinAmer" ||
      geogroup_name === "groupUSA"|| geogroup_name === "groupOceania" ) newSize = "21px";
  else if (geogroup_name === "groupAfrica") newSize = "18px";
  else if (geogroup_name === "groupAsia") newSize = "18px";
  
  d3.select("#tick" + idName).text(cityName)
    .style("font-size", newSize).style("opacity", 1)
    .attr("fill", colour_labelsHighlight);
}

function fn_cityLabels_perCapita (d, i, thisCityGroup) {
  if (d.includes("Sing")) console.log("!!!!!!!!!!!!!!!!!!!!!! ",d)
  if (thisCityGroup === "bar class_groupNAmer") {    
    if (d === "Cleveland" || d === "Las Vegas" || d==="Savannah" ||
        d === "Fort Collins" || d === "Hamilton, ON" || d === "Windsor, ON" ||
        d === "Knoxville" || d === "Edmonton" || d === "Emeryville, CA" ||
        d === "Nashville and Davidson") {
      xtrans = 60; ytrans = -5; rot = -90;
    }
    // else if (d === "Emeryville, CA" || d === "Knoxville") ytrans = -45 + (i*1.3);
    else ytrans = -85 + (i*1.3);
  } else if (thisCityGroup === "bar class_groupEastAsia") {    

    if (d === "Incheon" || d === "Kaohsiung" || d === "Yilan" ||
        d === "Taoyuan" || d === "Sapporo" || d === "Sendai") {
      // ytrans = -110;
      xtrans = 60; ytrans = -5; rot = -90;
    }
    else if (d === "Wonju") ytrans = -73;
    else {
    ytrans = (-60 + (i*2)) * 10/i;  //-75 + (i*2)
    }

  } else if (thisCityGroup === "bar class_groupEuropeSEAsia") {
    if (d === "Rotterdam" || d === "Uppsala" || d === "Ljubljana" ||
        d === "Umeå" || d === "Lahti" || d === "Lyon" || d === "Gävle" ||
        d === "Quezon" || //Singapore
        d === "Phuket" || d === "Ubon Ratchathani" ) {
      xtrans = 60; ytrans = 20; rot = -90;
    } else if (d === "Singa") {
      xtrans = 60; ytrans = 10; rot = -90;
    } 
    else {
      if (i < 45) ytrans = -60 + (i*1.9);
      else ytrans = (-17 + ((i-45)*2)) * 15/(i-45) //-50 + (i-45)*1.9;
    }

  } else if (thisCityGroup === "bar class_groupSouth") {
    if (d === "León" || d === "Toluca" || d === "Gandhinagar" ||
        d === "Windhoek" || d === "eThekwini" || d === "Izmir" ||
        d === "Auckland") {
      xtrans = 60; ytrans = 0; rot = -90;
    }
    else {
      if (i < 32) ytrans = -15 + (i*1.5);
      else if (i > 32 && i < 53) ytrans = -55 + (i*1.5);
      else if (i > 53 && i < 68) ytrans = -40 + (i-53)*5; //(-10 + ((i-53)*1.0)) * 8/(i-53);
      else if (i > 68 && i < 76) ytrans = -1 + (i-68)*5;
      else ytrans = -40 + (i-76)*8;
    }

  }
}

function fn_cityLabels_perGDP (d, i, thisCityGroup) {
  // thisRegion = data_GHG.find(x => x.city.includes(d)).region;  

  if (thisCityGroup === "bar class_groupUSA") {
    if (d === "Las Vegas") {rot = -90; xtrans = 60; ytrans = -15;}
    else if (d === "DC") ytrans = -40; //-3 + (i*1.6);
    else if (d === "Nashville & Davidson") ytrans = -20; //-3 + (i*1.6);
    //else if (d === "Cleveland") ytrans = -3 + (i*1.6);
    else ytrans = -36 + (i*1.2);
  } else if (thisCityGroup === "bar class_groupAsia") {
    if (d === "Kaohsiung" || d === "Taoyuan") {
      xtrans = 60; ytrans = -5; rot = -90;
    }  else if (d === "Taoyuan") {rot = -65; ytrans = -25;}
    else if (d === "Hong Kong") ytrans = -75;
    else if (d === "Incheon") ytrans = -35;
    else ytrans = -75 + (i*1.5);

  } else if (thisCityGroup === "bar class_groupEuropeSEAsia") {          
      if (d === "Manchester") ytrans = -20;
      else if (d === "Warsaw" || d === "Rotterdam") ytrans = 0;
      else ytrans = 20 + (i*0.7);

  } else if (thisCityGroup === "bar class_groupCan") {
      if (d === "Winnipeg") ytrans = -175 + (i*3.7);
      else if (d === "Edmonton" || d === "Calgary") ytrans = -185 + (i*4.3);      
      else ytrans = -170 + (i*4.3);

  } else if (thisCityGroup === "bar class_groupOceania") {
      if (d === "Auckland") ytrans = -50;
      else ytrans = -175 + (i*3.9);
  } else if (thisCityGroup === "bar class_groupLatinAmer") {
      if (d === "Caracas") {xtrans = 60; ytrans = -5; rot = -90;}
      else if (d === "Santiago") ytrans = -36;
      else ytrans = -135 + (i*2.2);
    
  } else if (thisCityGroup === "bar class_groupAfrica") {//ytrans = -160 + (i*2.2);
      // xtrans = 60; ytrans = 15; rot = -90;
      ytrans = -340 + (i*4.2);
    }
}

//...............................
// create barChart SVGs


//Create arrow + text for off-scale emissions
function fn_arrow(geogroup_id, city) {//used for offscale emission values

  var data = [];
  for (idx = 0; idx < city.length; idx++) {    
    if (city[idx] === "Rotterdam") {
      xpair = [-57]; ypair = [-25]; //posn of arrow
      xtext = [109]; ytext = [10]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    } else if (city[idx] === "Quezon") {
      xpair = [392]; ypair = [-25]; //posn of arrow
      xtext = [65]; ytext = [10]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    } 
    else if (city[0] === "Incheon" && city[1] === "Kaohsiung" && city[2] === "Yilan") {
      xpair = [-56, -50, -44]; ypair = [-166, -162, -135]; //posn of arrow and text pair
      xtext = [64, 105, 107]; ytext = [10, 0, 3]; //posn of text

      emissionText = [offscaleEmissionsDict[city[0]], 
                      offscaleEmissionsDict[city[1]],  offscaleEmissionsDict[city[2]]];
    } else if (city[idx] === "León") {
      xpair = [-56]; ypair = [-25]; //posn of arrow
      xtext = [70]; ytext = [10]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    } else if (city[idx] === "Gandhinagar") {
      xpair = [200]; ypair = [-25]; //posn of arrow
      xtext = [65]; ytext = [10]; //posn of text
      emissionText = offscaleEmissionsDict[city[0]]; //+ " kgCO₂eq/USD"
    }

    //define arrow name and path
    data.push({ id:idx, name:"arrow" + city[idx], path:"M 2,2 L2,11 L10,6 L2,2" });
  }
  
  
  appendArrowSVG(geogroup_id, data, city);

}
function appendArrowSVG(geogroup_id, data, city) {  
  margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

  for (idx = 0; idx < data.length; idx++) {
    svg = d3.select(geogroup_id).select(".barSVG")
             .append("g")
             .attr('height', height + margin.top + margin.bottom)
            .attr("transform", "translate(" + xpair[idx] + "," + ypair[idx] + ")") //posn of arrow and text
             .append("svg")
            .attr('width', width + margin.left + margin.right);
            

    var defs = svg.append('svg:defs')

    var paths = svg.append('svg:g')
      .attr('id', 'markers' + city[idx])
      .attr('transform', 'translate(' + 42 + ',' + 63 + ')');

    //http://tutorials.jenkov.com/svg/marker-element.html
    var marker = defs.selectAll('marker')
      .data(data)
      .enter()
      .append('svg:marker')
        .attr('id', function(d){ return 'marker_' + d.name })
        .attr('markerHeight', 13)
        .attr('markerWidth', 13)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 2)
        .attr('refY', 6)
        .append('svg:path')
          .attr('d', function(d){ return d.path; })
          .attr('fill', function(d,i) { return "#565656"; });

    ypath = [50, 50, 50]; //arrow length
    var path = paths.selectAll('path')
      .data(data)
      .enter()
      .append('svg:path')
        .attr('d', function (d, i){          
          return 'M 100,' + 0 + ' V ' + ypath[idx] + ',' + 0 + '';
        })
        .attr('stroke', function(d,i) { return "#565656"; })
        .attr('stroke-width', 1)
        .attr('stroke-linecap', 'round')
        .attr('marker-start', function(d,i){ return 'url(#marker_stub' + city[idx] + ')'; })
        .attr('marker-end', function(d,i){ return 'url(#marker_arrow' + city[idx]  + ')'; })
        .attr("transform", function (d) { //adjusts arrow proportions
          var xscale = 0.5, yscale = 0.8;         
          return "scale(" + xscale + " " + yscale + ")";          
        })
        .append('svg:path')
          .attr('d', function(d){ return d.path; });

    //arrow text
    d3.select("#markers" + city[idx]).append("text").attr("id", "text" + city[idx]);
   
    d3.select("#text" + city[idx])
      .text(emissionText[idx])
      .style("fill", "#565656")
      .attr("transform", function (d) { //adjust arrow proportions
          var xscale = 0.5, yscale = 1.9;         
          
          return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + xtext[idx] + " " + ytext[idx] + ")" ;       
      });
  }
}

//Create barChart titles for each geographic region
function fn_svgHeadings (geogroup_id) {

  if (geogroup_id === "#barChart_groupEastAsia") {
    numHeadings = ["East Asia"];
    svgTrans = [ [148, -20] ]; //y=22?
  } else if (geogroup_id === "#barChart_groupNAmer") {
    numHeadings = ["North America"];
    svgTrans = [ [148, 25] ];
  } else if (geogroup_id === "#barChart_groupEuropeSEAsia") {
    numHeadings = ["Europe", "Southeast Asia"];
    svgTrans = [ [148, 53], [1020, 53]];
  } else if (geogroup_id === "#barChart_groupSouth") {
    numHeadings = ["Latin America & Caribbean", "South Asia", "Africa",
                   "N Africa & W Asia", "Oceania"];
    svgTrans = [ [148, 61], [628, 61], [964, 61], [1109, 61], [1277, 61]];
  }  


  var svgTitle = d3.select(geogroup_id).select(".barSVG")
          .append("g")
          .attr("transform", function () {
            transx = 0;
            transy = (geogroup_id === "#barChart_EUCWLatAmerAfrica") ? 0 : -30;
            return "translate(" + transx + "," + transy + ")";
          });

  svgTitle.append("svg")
          .attr('width', 700)
          .attr('height', 100);

  for (idx = 0; idx < numHeadings.length; idx++) {
    svgTitle.append("g")
      .append("text").attr("class", "headingClass")
      .text(numHeadings[idx])
      .attr("transform", function (d) {
          var xscale = 0.5, yscale = 1.9;
          
          return "scale(" + xscale + " " + yscale + ")" + 
                "translate(" + svgTrans[idx][0] + " " + svgTrans[idx][1] + ")" ;
        });
  }
}

//----------------------------------------------
// Functions for city card info
//----------------------------------------------

function fn_setupSVGCityCard(svgCityCard, className, idName, transX, transY) {
  //setup text node label or value
  svgCityCard.append("text").attr("class", className)
    .attr("id", idName)
    .attr("transform", function (d) {
      return "translate(" + transX + " " + transY + ")" ;
    });
}

//Info text in svg
function fn_fillSVGCityCard (selectedCityObj, attrFlag) {
  // console.log("selectedCityObj in fn: ", selectedCityObj)
  // console.log("attrFlag in fn: ", attrFlag)

  //show city card
  d3.select("#cityCardg").select("rect").style("opacity", 1);
  
  //city name
  svgCityCard.select("#cityCardCity").text(selectedCityObj.city)
            .style("font-size", "11px");

  //country
  svgCityCard.select("#cityCardCountry").text(selectedCityObj["country"]);

  //emissions
  svgCityCard.select("#cityCardEmissionsLabel").text("Scope 1 Emissions:")
    .style("text-decoration", "underline")
    .on("touchmove mousemove", function () {d3.select(this).style("cursor", "pointer"); })  
    .on("click", function() { 
      window.open("http://www.ghgprotocol.org/sites/default/files/ghgp/standards/GHGP_GPC_0.pdf#page=13");
  });
  svgCityCard.select("#cityCardEmissions")
    .text(formatDecimalSci(selectedCityObj["Scope1"]/1e6) + " MtCO₂eq");

  //Measurement year
  svgCityCard.select("#cityCardYearLabel").text("Measurement Year:");
  svgCityCard.select("#cityCardYear").text(function () {
    return selectedCityObj["Measurement year"];
  }).style("font-size", "11px");

  //change in emissions
  var changeText = selectedCityObj["change in emissions"] === "First year of calculation" ?
      selectedCityObj["change in emissions"] : selectedCityObj["change in emissions"] + " (from Measurement year)";
  svgCityCard.select("#cityCardChangeLabel").text("Emissions Change:");
  svgCityCard.select("#cityCardChange").text(function () {
    return changeText;
  }).style("font-size", "11px");

  //protocol
  var protocolNum = selectedCityObj["methodology"];
  svgCityCard.select("#cityCardProtocolLabel").text("Protocol:");
  svgCityCard.select("#cityCardProtocol")
    .text(choose_textArray["methodology"][protocolNum - 1])
    .style("font-size", "11px");

  //selected attribute
  if (attrFlag != "methodology" && attrFlag != "change in emissions" && 
      attrFlag != "Measurement year") { //these attributes already on display
    if (attrFlag === "gas price" || attrFlag === "diesel price") {
      attrText = attrFlag + " (national value)"; }
    else attrText = attrFlag;
    svgCityCard.select("#cityCardAttrLabel").text(attrText + ":");

    if (attrFlag === "diesel price" || attrFlag === "gas price") attrValue = selectedCityObj[attrFlag];
    else attrValue = formatComma(parseInt(selectedCityObj[attrFlag]));

    svgCityCard.select("#cityCardAttr")
      .text(attrValue + " " + dimUnits[attrFlag]);
  }

}