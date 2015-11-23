/*global describe,it,beforeEach,before,after*/
/* jshint -W030 */
'use strict';

var chai = require( 'chai' );
var expect = chai.expect;
var QRS = new require( './../../lib/qrs' );
var extend = require( 'extend-shallow' );
var fsUtils = require( 'fs-utils' );
var path = require( 'path' );
var testSetup = require( './../testSetup' );
var async = require( 'async' );
var extensionSetup = require( './../03-ep-extension.setup' )();

var qrs;

var globalConfig = testSetup.globalConfig;
describe.skip( 'qrs.extension', function () {

	it( 'should be an object', function () {
		qrs = new QRS( globalConfig );
		expect( qrs.extension ).to.exist;
	} );

	testSetup.testLoop.forEach( function ( loopConfig ) {

		describe( 'with ' + loopConfig.name, function (  ) {

			var testConfig = extend( globalConfig, loopConfig.config );

			after( function ( done ) {
				console.log('after \n');
				//extensionSetup.cleanExtZipFiles( function ( /*err, extensions*/ ) {
				//	done();
				//} );
				done();
			} );

			before( function ( done ) {
				console.log('before\n');
				extensionSetup.init( done );
			} );

			beforeEach( function ( done ) {
				console.log('beforeEach\n');
				qrs = new QRS( testConfig );
				async.map( extensionSetup.extensions, function ( ext, cb ) {
					console.log('delete ' + ext.name);
					qrs.extension.delete( ext.name )
							.then( function ( data ) {
								//cb( null );
							}, function ( err ) {
								cb( err );
							});
				}, function ( err /*, results */ ) {
					if (err) {
						throw err;
					}
					done( );
				});
			} );

			it( 'should return all installed extensions', function ( done ) {
				qrs.extension.getInstalled()
						.then( function ( data ) {
							expect( data ).to.exist;
							expect( data ).to.be.an.array;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			// Todo: To make the test repeatable & reliebable we have to upload first, then we can check the test.
			it( 'should allow a filter to only return specific types', function ( done ) {
				qrs.extension.getInstalled( ['visualization-template'] )
						.then( function ( data ) {
							expect( data ).to.exist;
							expect( data ).to.be.an.array;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			//Todo: Improve the test => move to unit tests
			it( 'should return only extensions of type <visualization>', function ( done ) {
				qrs.extension.getInstalledVis()
						.then( function ( data ) {
							expect( data ).to.exist;
							expect( data ).to.be.an.array;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			//Todo: Improve the test => move to unit tests
			it( 'should return only extensions of type <visualization-template>', function ( done ) {
				qrs.extension.getInstalledVisTemplates()
						.then( function ( data ) {
							expect( data ).to.exist;
							expect( data ).to.be.an.array;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			//Todo: Improve the test ==> move to unit tests
			it( 'should return only extensions of type <mashup>', function ( done ) {
				qrs.extension.getInstalledMashups()
						.then( function ( data ) {
							expect( data ).to.exist;
							expect( data ).to.be.an.array;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			//Todo: Improve the test ==> move to unit tests
			it( 'should return only extensions of type <mashup-template>', function ( done ) {
				qrs.extension.getInstalledMashupTemplates()
						.then( function ( data ) {
							expect( data ).to.exist;
							expect( data ).to.be.an.array;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			describe( 'qrs.extension.upload', function () {


				it( 'doesn\'t allow upload of non existing files', function ( done ) {
					qrs.extension.upload( path.join(__dirname, './fixtures/extensions/qrs-ABCDEFGHIJKLMNOPQ.zip'))
							.then( function ( data ) {
								expect( data ).to.not.exist;
							}, function ( err ) {
								expect( err ).to.exist;
								expect(err ).contains('File does not exist.');
							})
							.done( function (  ) {
								done();
							});

				} );

				it( 'doesn\'t allow upload of an extension with a different type than .zip', function ( done ) {

					qrs.extension.upload( path.join(__dirname, './fixtures/extensions/qrs-sample.7z'))
							.then( function ( data ) {
								expect( data ).to.not.exist;
							}, function ( err ) {
								expect( err ).to.exist;
								expect( err ).contains('Only .zip files can be uploaded.')
							})
							.done( function () {
								done();
							});
				} );
			});



			/**
			 * @todo: Returns "bad request" if extension is already existing.
			 */
			it( 'should allow upload of an extension with absolute path', function ( done ) {
				var extFilePath = path.join( __dirname, './fixtures/extensions/qrs-sample.zip' );
				qrs.extension.upload( extFilePath )
						.then( function ( data ) {
							expect( data ).to.exist;
						}, function ( err ) {
							expect( err ).to.not.exist;
						} )
						.done( function () {
							done();
						} );
			} );

			describe( 'should allow deletion of an extension', function () {

				before( '', function ( done ) {
					//qrs.extension.upload
					done();
				} );
				after( '', function ( done ) {

					done();
				} );

				it( '...', function ( done ) {
					expect( true ).to.equal( true );
					done();
				} );
			} );

			it.skip( 'should refuse to upload an exetension if already existing, even with another type', function ( done ) {
				expect( true ).to.equal( false );
				done();
			} );

		});
	});
} );