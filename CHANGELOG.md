# Change Log

This project uses [Semantic Versioning](http://semver.org/). All releases are documented both on the GitHub [releases page](https://github.com/letscodework/codework/releases) and in this file.

## v1.0.0-rc.3 (September 3, 2018)

- Stop saving a user's email to the database because it's not needed anywhere ([#90](https://github.com/letscodework/codework/pull/90))

## v1.0.0-rc.2 (February 19, 2018)

- Use the correct Firebase config based on the env ([#88](https://github.com/letscodework/codework/pull/88))

## v1.0.0-rc.1 (February 19, 2018)

- Port app from React to Vue and add ability to delete own solutions ([#85](https://github.com/letscodework/codework/pull/85), [#86](https://github.com/letscodework/codework/pull/86))

## v1.0.0-beta.4 (January 14, 2018)

- Add syntax highlighting to regular expressions in code blocks ([#81](https://github.com/letscodework/codework/pull/81))

## v1.0.0-beta.3 (November 28, 2017)

- Add a visual difficulty indicator to each challenge based on its KYU point value ([#73](https://github.com/letscodework/codework/pull/73))
- Add a config for the development Firebase instance ([#74](https://github.com/letscodework/codework/pull/74))
- Refactor cards and lists (for challenges, submissions, and tags) to use better named and organized components ([#75](https://github.com/letscodework/codework/pull/75))
- Load user data on demand card instead of loading data for all users into state on app initialization ([#76](https://github.com/letscodework/codework/pull/76))
- Reorganize utils into a single file of small helper functions, and unregister the service worker ([#77](https://github.com/letscodework/codework/pull/77))
- Rename entities and/or their attributes to be more semantic and just generally better ([#78](https://github.com/letscodework/codework/pull/78))
- Fix buttons affected by Chrome v62 applying a default border radius ([#79](https://github.com/letscodework/codework/pull/79))

## v1.0.0-beta.2 (November 11, 2017)

- Refactor some firebase and state structures ([#68](https://github.com/letscodework/codework/pull/68), [#70](https://github.com/letscodework/codework/pull/70))
- Add 404 page ([#69](https://github.com/letscodework/codework/pull/69))
- Add number of solutions to challenge cards ([#71](https://github.com/letscodework/codework/pull/71))

## v1.0.0-beta.1 (October 11, 2017)

This is the initial public release.
