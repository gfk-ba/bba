/**
 * Contains a helper function for database fixtures
 * see https://github.com/typeorm/typeorm/issues/1550#issuecomment-381039669
 */

/**
 * Import nodeJS and externaml libraries
 */
import { Connection } from 'typeorm';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

/**
 * This async function will load and execute the specified fixture from ../../test/fixtures
 * @param name The name of the fixture (without the .yml file extension).
 * @param dbConnection The database connection to use to execute the fixture.
 */
export async function loadFixtures(
  name: string,
  dbConnection: Connection,
): Promise<any> {
  let items: any[] = [];
  try {
    const file: any = yaml.safeLoad(
      fs.readFileSync(`../../test/fixtures/${name}.yml`, 'utf8'),
    );
    // tslint:disable-next-line: no-string-literal
    items = file['fixtures'];
  } catch (e) {
    console.log('fixtures error', e);
  }

  if (!items) {
    return;
  }

  items.forEach(async (item: any) => {
    const entityName = Object.keys(item)[0];
    const data = item[entityName];
    await dbConnection
      .createQueryBuilder()
      .insert()
      .into(entityName)
      .values(data)
      .execute();
  });
}
