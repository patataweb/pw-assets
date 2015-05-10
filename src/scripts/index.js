/**
 * Class Person
 */
class Person {

  /**
   * Constructor
   * @param lastName
   * @param firstName
   * @param age
   * @param sex
   */
  constructor(lastName, firstName, age, sex) {
    this.lastName  = lastName;
    this.firstName = firstName;
    this.age       = age;
    this.sex       = sex;

    // CONSTANT
    Person.SEX_MALE   = 'm';
    Person.SEX_FEMALE = 'f';
  }

  /**
   * Return the name as string
   * @returns {string}
   */
  toString() {
    return this.firstName + ' ' + this.lastName;
  }

  set sex(value) {
    if ([Person.SEX_FEMALE, Person.SEX_MALE].indexOf(value) >= 0) {
      this._sex = value;
    }
  }

  get sex() {
    return this._sex;
  }

  /**
   * Return true if is an Adult
   * @returns {boolean}
   */
  isAdult() {
    return this.age > 18;
  }

  /**
   * Return true if is male
   * @returns {boolean}
   */
  isMale() {
    return this.sex === Person.SEX_MALE;
  }

  /**
   * Return true if is female
   * @returns {boolean}
   */
  isFemale() {
    return this.sex === Person.SEX_FEMALE;
  }

  /**
   *
   * @param {Person} person
   * @returns {*}
   */
  static isAdult(person) {
    return person.isAdult();
  }

  /**
   *
   * @param person
   * @returns {boolean|*}
   */
  static isFemale(person) {
    return person.isFemale();
  }

  /**
   *
   * @param person
   * @returns {boolean|*}
   */
  static isMale(person) {
    return person.isMale();
  }
}

let persons = [
  new Person('fsdfdsfsdf', 'fdsfdsfsdfds', 15, Person.SEX_FEMALE),
  new Person('fsdfdsfsdf', 'fdsfdsfsdfds', 28, Person.SEX_MALE),
  new Person('fsdfdsfsdf', 'fdsfdsfsdfds', 32, Person.SEX_MALE),
  new Person('dfggdfdfgfd', 'fdsfdsfsdfds', 65, Person.SEX_MALE),
  new Person('dfggdfdgfdgfgdf', 'fdsfdsfsdfds', 12, Person.SEX_MALE),
  new Person('fsdfdsfsdf', 'fdsfdsfsdfds', 3, Person.SEX_FEMALE),
  new Person('dgfgdfdfgdfgdfg', 'fdsfdsfsdfds', 11, Person.SEX_FEMALE),
  new Person('fsdfdsfsdf', 'fdsfdsfsdfds', 50, 'wrong')
];

let adults       = persons.filter(Person.isAdult);
let adultsMale   = adults.filter(Person.isMale);
let adultsFemale = adults.filter(Person.isFemale);

console.log(adultsFemale);
console.log(adultsMale);