// Fake API for dashboard info
export async function fetchDashboard(year: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate mock data based on year
    const base = parseInt(year, 10);
    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Mock monthly sales
    const monthlySales = Array.from({ length: 12 }, (_, i) => ({
        month: `${base}-${String(i + 1).padStart(2, '0')}-01`,
        total: random(10000000, 100000000),
    }));

    // Mock users, products, sales
    const usersThisMonth = random(1000, 5000);
    const usersLastMonth = usersThisMonth - random(-200, 200);
    const productsThisMonth = random(200, 1000);
    const productsLastMonth = productsThisMonth - random(-50, 50);
    const salesThisMonth = random(10000000, 100000000);
    const salesLastMonth = salesThisMonth - random(-500000, 500000);

    return {
        data: {
            users: { thisMonth: usersThisMonth, lastMonth: usersLastMonth },
            products: { thisMonth: productsThisMonth, lastMonth: productsLastMonth },
            sales: { thisMonth: salesThisMonth, lastMonth: salesLastMonth },
            monthlySales,
        },
    };
}
