# VK_NULL_HANDLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NULL_HANDLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NULL_HANDLE - Reserved non-valid object handle

`VK_NULL_HANDLE` is a reserved value representing a non-valid object
handle.
It may be passed to and returned from Vulkan commands only when
[specifically allowed](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-handles).

// Provided by VK_VERSION_1_0
#ifndef VK_DEFINE_NON_DISPATCHABLE_HANDLE
    #if (VK_USE_64_BIT_PTR_DEFINES==1)
        #if (defined(__cplusplus) && (__cplusplus >= 201103L)) || (defined(_MSVC_LANG) && (_MSVC_LANG >= 201103L))
            #define VK_NULL_HANDLE nullptr
        #else
            #define VK_NULL_HANDLE ((void*)0)
        #endif
    #else
        #define VK_NULL_HANDLE 0ULL
    #endif
#endif
#ifndef VK_NULL_HANDLE
    #define VK_NULL_HANDLE 0
#endif

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_USE_64_BIT_PTR_DEFINES](VK_USE_64_BIT_PTR_DEFINES.html), [VK_VERSION_1_0](VK_VERSION_1_0.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#VK_NULL_HANDLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
