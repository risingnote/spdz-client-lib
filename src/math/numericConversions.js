/**
 * Manage integer to fixed point conversions. Normally access via Gfp methods.
 */
import assert from 'assert'

/**
 * Convert a bit shifted integer representing a SPDZ fixed point number into a JS number 
 * @param {Number} shiftedInteger 
 * @param {integer} fixedPointDecBitLength (see Gfp.fixedPointDecBitLength())
 * @returns {Number} real number
 */
const shiftedIntegerToJSFixed = (shiftedInteger, fixedPointDecBitLength) => {
  // Don't use bit shift operators as coerces to signed 32 bit first.
  const maxDecimal = Math.pow(2, fixedPointDecBitLength)
  const significand = Math.trunc(shiftedInteger / maxDecimal)
  const decimal = (shiftedInteger % maxDecimal) / maxDecimal
  return significand + decimal
}

/**
 * Round a number to fixed number of places, using fixed point bit length to determine precision.
 * @param {Number} number 
 * @param {integer} fixedPointDecBitLength (see Gfp.fixedPointDecBitLength())
 * @returns {String} number with fixed decimal places.
 */
const roundFixed = (number, fixedPointDecBitLength) => {
  const maxDecimal = Math.pow(2, fixedPointDecBitLength)
  return number.toFixed(maxDecimal.toString().length - 1)
}

/**
 * Convert a real number into a bit shifted integer representing a SPDZ fixed point number.
 * @param {Number} real number 
 * @param {integer} fixedPointDecBitLength (see Gfp.fixedPointDecBitLength())
 * @param {integer} fixedPointWholeBitLength (see Gfp.fixedPointWholeBitLength())
 * @returns {Number} shifted integer
 */
const jsNumberToShiftedInteger = (
  number,
  fixedPointDecBitLength,
  fixedPointWholeBitLength
) => {
  assert(
    Math.trunc(number) <=
      Math.pow(2, fixedPointWholeBitLength - fixedPointDecBitLength) - 1,
    `Converting real number to fixed point, integer part exceeded ${fixedPointWholeBitLength -
      fixedPointDecBitLength} bits.`
  )
  const shifted = Math.trunc(
    Math.round(number * Math.pow(2, fixedPointDecBitLength))
  )
  return shifted
}

export { shiftedIntegerToJSFixed, roundFixed, jsNumberToShiftedInteger }
