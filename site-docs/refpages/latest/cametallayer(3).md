# CAMetalLayer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CAMetalLayer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CAMetalLayer - CoreAnimation native layer type for Metal

To remove an unnecessary compile time dependency, an incomplete type
definition of `CAMetalLayer` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_surface
#ifdef __OBJC__
@class CAMetalLayer;
#else
typedef void CAMetalLayer;
#endif

The actual `CAMetalLayer` type is defined in the QuartzCore
framework.

[VK_EXT_metal_surface](VK_EXT_metal_surface.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#CAMetalLayer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
