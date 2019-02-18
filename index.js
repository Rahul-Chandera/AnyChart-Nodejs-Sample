
exports.handler = function (event, context, callback) {
		var JSDOM = require('jsdom').JSDOM;
		var jsdom = new JSDOM('<body><div id="container"></div></body>', {runScripts: 'dangerously'});
		var window = jsdom.window;
	
		var anychart = require('anychart')(window);
		var anychartExport = require('anychart-nodejs')(anychart);
		var stage = anychart.graphics.create("container");
	
		// Table Layout sample
		var layoutTable = anychart.standalones.table(3, 3);
		layoutTable.cellBorder(null);
		layoutTable.getCol(0).width('15%');
		layoutTable.getCol(1).width('85%');
		layoutTable.getCell(0, 0).content("101").vAlign('center').fontFamily('Tahoma').fontSize(22).fontStyle('bold').fontColor('#EE7001');
		layoutTable.getCell(0, 1).content("Employee Name").hAlign('left').vAlign('center').fontFamily('Tahoma').fontSize(22).fontStyle('bold').fontColor('#3498DB');
	
		// Column chart sample
		var chart = anychart.column();
		chart.title('Column Chart');
		chart.data([
			{x: 'One', value: 20},
			{x: 'Two', value: 15},
			{x: 'Three', value: 25},
			{x: 'Four', value: 30}
		]);
		chart.bounds(20, 100, 450, 300);
	
		// Pie chart sample
		var chart2 = anychart.pie(); 
		chart2.title('Pie Chart');
		chart2.data([
			{x: 'A', value: 40},
			{x: 'B', value: 30},
			{x: 'C', value: 10},
			{x: 'D', value: 50}
		]);
	
		// Bar chart sample
		var chart3 = anychart.bar();
		chart3.title('Bar Chart');
		var data = anychart.data.set([
			['One', 3, 7],
			['Two', 4, 6],
			['Three', 2, 8],
			['Four', 5, 5]
		]);
		var seriesData_1 = data.mapAs({x: 0, value: 1});
		var seriesData_2 = data.mapAs({x: 0, value: 2});
		var series1 = chart3.bar(seriesData_1);
		var series2 = chart3.bar(seriesData_2);
		series1.normal().fill("#00cc99", 0.3);
		series1.normal().stroke("#00cc99", 1, "10 5", "round");
		series2.normal().fill("#E67E22", 0.3);
		series2.normal().stroke("#E67E22");
		chart3.xAxis().title("Values");
		chart3.yAxis().title("Votes");
	
		// Complex Bar chart sample
		var chart4 = anychart.bar();
		chart4.title("Bar Chart 2");
		var data2 = anychart.data.set([
			['One', 3, 4, 6, 5],
			['Two', 4, 6, 3, 6],
			['Three', 2, 5, 2, 3],
			['Four', 5, 4, 1, 7]
		]);
		var seriesData_3 = data2.mapAs({'x': 0, 'value': 1});
		var seriesData_4 = data2.mapAs({'x': 0, 'value': 2});
		var seriesData_5 = data2.mapAs({'x': 0, 'value': 3});
		var seriesData_6 = data2.mapAs({'x': 0, 'value': 4});
		chart4.yScale().stackMode('percent');
		chart4.yAxis(0).labels().format('{%Value}%');
		var setupSeriesLabels = function (series, name) {
			series.name(name)
							.stroke('3 #fff 1');
			series.hovered().stroke('3 #fff 1');
		};
		var series;
			series = chart4.bar(seriesData_3);
			setupSeriesLabels(series, 'A');
			series = chart4.bar(seriesData_4);
			setupSeriesLabels(series, 'B');
			series = chart4.bar(seriesData_5);
			setupSeriesLabels(series, 'C');
			series = chart4.bar(seriesData_6);
			setupSeriesLabels(series, 'D');
			chart4.legend()
							.enabled(true)
							.fontSize(14)
							.padding([0, 0, 15, 0]);
			chart4.interactivity().hoverMode('by-x');
			chart4.tooltip()
							.displayMode('union')
							.valuePrefix('$');

		// Set position and size of all charts		
		layoutTable.bounds(20, 20, 400, 60);
		chart2.bounds(540, 100, 450, 300);
		chart3.bounds(20, 450, 450, 320);
		chart4.bounds(540, 450, 450, 320);
	
		// Set container to all charts
		layoutTable.container(stage);
		chart.container(stage);
		chart2.container(stage);
		chart3.container(stage);
		chart4.container(stage);
	
		// Draw all chart
		layoutTable.draw();
		chart.draw();
		chart2.draw();
		chart3.draw();
		chart4.draw();
	
		// generate PDF from container
		anychartExport.exportTo(stage, 'pdf').then(function(image) {
			// Save PDF to local folder
			saveToFolder('/tmp/anychart.pdf', image);
			// OR Save PDF to AWS S3 bucket
			saveToS3('{S3 BUCKET NAME}', 'anychart.pdf', image);
		}, function(generationError) {
			console.log(generationError);
		});
	}

	function saveToFolder(folder, image) {
		var fs = require('fs');
		fs.writeFile(folder, image, function(fsWriteError) {
			if (fsWriteError) {
				console.log(fsWriteError);
			} else {
				console.log('Complete');
			}
		});
	}

	function saveToS3(bucket, key, image) {
		var AWS = require('aws-sdk');
		var s3 = new AWS.S3();
		var params = {
			Bucket : bucket,
			Key : key,
			Body : image,
			ACL: 'public-read'
		}
		s3.putObject(params, function(err, image) {
          if (err) console.log(err, err.stack);
          else     console.log(image);
      });
}                    