#include <iostream>
//#include "Sales_item.h"
int main () {
//    Sales_item item1, item2;
//    std::cin >> item1 >> item2;
//    std::cout << item1 + item2 << std::endl;
    int i, &ri = i;
    i = 5; ri = 10;
    std::cout << i << " " << ri << std::endl;
    return 0;
}
