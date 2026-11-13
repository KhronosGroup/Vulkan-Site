# VK_USE_64_BIT_PTR_DEFINES(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_USE_64_BIT_PTR_DEFINES.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_USE_64_BIT_PTR_DEFINES - Defines whether non-dispatchable handles are a 64-bit pointer type or a 64-bit unsigned integer type

`VK_USE_64_BIT_PTR_DEFINES` defines whether the default non-dispatchable
handles are declared using either a 64-bit pointer type or a 64-bit unsigned
integer type.

`VK_USE_64_BIT_PTR_DEFINES` is set to '1' to use a 64-bit pointer type
or any other value to use a 64-bit unsigned integer type.

// Provided by VK_VERSION_1_0
#ifndef VK_USE_64_BIT_PTR_DEFINES
    #if defined(__LP64__) || defined(_WIN64) || (defined(__x86_64__) && !defined(__ILP32__) ) || defined(_M_X64) || defined(__ia64) || defined (_M_IA64) || defined(__aarch64__) || defined(__powerpc64__) || (defined(__riscv) && __riscv_xlen == 64)
        #define VK_USE_64_BIT_PTR_DEFINES 1
    #else
        #define VK_USE_64_BIT_PTR_DEFINES 0
    #endif
#endif

|  | The `vulkan_core.h` header allows the `VK_USE_64_BIT_PTR_DEFINES`
| --- | --- |
definition to be overridden by the application.
This allows the application to select either a 64-bit pointer type or a
64-bit unsigned integer type for non-dispatchable handles in the case where
the predefined preprocessor check does not identify the desired
configuration. |

|  | This macro was introduced starting with the Vulkan 1.2.174 headers, and its
| --- | --- |
availability can be checked at compile time by requiring
`VK_HEADER_VERSION` >= 174.

It is not available if you are using older headers, such as may be shipped
with an older Vulkan SDK.
Developers requiring this functionality may wish to include a copy of the
current Vulkan headers with their project in this case. |

[VK_NULL_HANDLE](VK_NULL_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#VK_USE_64_BIT_PTR_DEFINES).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
