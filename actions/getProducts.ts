import prisma from '@/libs/prisma';

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProduct(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    const searchString = searchTerm || '';

    // Construcción dinámica de condiciones de búsqueda
    const whereClause: any = {};

    if (category) {
      whereClause.category = category;
    }

    if (searchString) {
      whereClause.OR = [
        {
          name: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: 'desc',
          },
        },
      },
     
    });

    return products;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    throw new Error(error.message);
  }
}
