/*
 * ColorizeFilter
 * Migrated multiply filter
 * Written for createljs lib (Copyright (c) 2010 gskinner.com, inc.)
 * Visit http://createjs.com/ for documentation, updates and examples.
 * 
 * Migrated from Multiply fabricJS filiter:
 * http://fabricjs.com/docs/fabric.Image.filters.Multiply.html
 * 
 * Migrated bu Andrii Cherepovskyi	
 * http://cherepovskiy.com
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module EaselJS
 */

// namespace:
this.createjs = this.createjs || {};

(function () {
	"use strict";

	var sourceFromHex = function (color) {

		var value = color.slice(color.indexOf('#') + 1),
			isShortNotation = (value.length === 3 || value.length === 4),
			isRGBa = (value.length === 8 || value.length === 4),
			r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
			g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
			b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6),
			a = isRGBa ? (isShortNotation ? (value.charAt(3) + value.charAt(3)) : value.substring(6, 8)) : 'FF';

		return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16),
        parseFloat((parseInt(a, 16) / 255).toFixed(2))
      ];

	}

	function ColorizeFilter(color) {

		this.color = color || '#000000';
		this.source = sourceFromHex(this.color);

	}
	var p = createjs.extend(ColorizeFilter, createjs.Filter);
	p.toString = function () {
		return "[ColorizeFilter]";
	};
	p.clone = function () {
		return new ColorizeFilter(this.color);
	};


	// private methods:
	/** docced in super class **/
	p._applyFilter = function (imageData) {
		var data = imageData.data;
		var l = data.length;
		for (var i = 0; i < l; i += 4) {
		
			 data[i] *= this.source[0] / 255;
       data[i + 1] *= this.source[1] / 255;
       data[i + 2] *= this.source[2] / 255;
		}
		return true;
	};

	createjs.ColorizeFilter = createjs.promote(ColorizeFilter, "Filter");
}());
