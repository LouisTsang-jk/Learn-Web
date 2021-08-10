#include <iostream>
//#include "Sales_item.h"
int main () {
//    Sales_item item1, item2;
//    std::cin >> item1 >> item2;
//    std::cout << item1 + item2 << std::endl;
    int ival = 42;
    int *p = &ival;
    std::cout << ival << "-" << *p << std::endl;
    ival += 5;
    std::cout << ival << "-" << *p << std::endl;
    std::cout << p << "-" << &ival << std::endl;
    return 0;
}
