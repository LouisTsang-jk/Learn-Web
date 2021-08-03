//
//  main.cpp
//  LearnC++
//
//  Created by LouisTsang on 2021/8/2.
//

#include <iostream>

//int main() {
//    std::cout << "Enter two numbers:" << std::endl;
//    int v1 = 0, v2 = 0;
//    std::cin >> v1 >> v2;
//    std::cout << " The sum of " << v1 << " and " << v2 << " is " << v1 + v2 << std::endl;
//    return 0;
//}

int main() {
    int sum = 0, value = 0;
    std::cout << "Enter sth:" << std::endl;
    while(std::cin >> value)
        sum += value;
    std::cout << "Sum is: " << sum << std::endl;
    return 0;
}
