#include <iostream>
//#include "Sales_item.h"
int main () {
//    Sales_item item1, item2;
//    std::cin >> item1 >> item2;
//    std::cout << item1 + item2 << std::endl;
    int ival = 1024;
    int ival2 = 1024;
    int &refVal = ival;
    int fakeVal = ival;
    int &refVal2 = ival2;
    std::cout << refVal << std::endl;
    std::cout << fakeVal << std::endl;
    ival = ival + 100;
    std::cout << ival << std::endl;
    std::cout << fakeVal << std::endl;
    std::cout << refVal << std::endl;
    std::cout << refVal2 << std::endl;
    return 0;
}
