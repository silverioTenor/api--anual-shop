import CategoryBuilder from './category';

describe('Unit Test for Category', () => {
   it('should create a product', () => {
      const category = new CategoryBuilder()
         .withName('Category 1')
         .build();

      expect(category).toBeDefined();
      expect(category).toEqual({
         _id: expect.any(String),
         _name: 'Category 1',
         _notification: {
            errors: [],
         },
      });
   });
});
