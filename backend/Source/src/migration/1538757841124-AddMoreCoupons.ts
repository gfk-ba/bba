import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMoreCoupons1538757841124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('g6e8o1')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('ZraAjI')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('ihoq5A')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('2K7slc')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('dKM942')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('FkSDhJ')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('D9pUs6')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('aTsTle')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('OVAal5')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('DEmmRU')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('MFpUPK')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('OkggqM')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('owkGOg')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('aQwpFP')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('PPN4rN')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('wTLnd1')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('G1eLTb')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('vs3rKM')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('S22scW')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('HBvRJQ')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('hFlt1O')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('JjsytB')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('1Zb3JT')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('5zRrrQ')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('PBNZdt')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('2LzsDH')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('SkRQaQ')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('AoHRon')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('SWLuxb')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('HYbSYi')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('gpDilx')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('HX2E8O')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('Q6z1Yx')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('6U2iSw')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('8RJijp')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('nWGqWq')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('ptRQjm')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('8CVi1V')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('UBK3sV')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('KLgwOZ')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('rHFNyW')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('NeEUNW')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('EJV2lI')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('R27Fpd')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('fCGDno')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('7Y5NqI')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('EukVQg')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('7rRLCX')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('i4N8AF')`);
    queryRunner.query(`INSERT INTO coupons (code) VALUES ('OmVdVS')`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.clearTable('coupons');
    -queryRunner.query(`ALTER SEQUENCE coupons_id_seq RESTART WITH 1`);
  }
}
