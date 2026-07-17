# MTLBuffer_id(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/MTLBuffer_id.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

MTLBuffer_id - Metal MTLBuffer type reference

The type `id` is defined in Apple’s Metal framework, but to
remove an unnecessary compile time dependency, an incomplete type definition
of `MTLBuffer_id` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
#ifdef __OBJC__
@protocol MTLBuffer;
typedef __unsafe_unretained id MTLBuffer_id;
#else
typedef void* MTLBuffer_id;
#endif

[VK_EXT_metal_objects](VK_EXT_metal_objects.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#MTLBuffer_id).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
