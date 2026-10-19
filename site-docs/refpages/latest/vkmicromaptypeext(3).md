# VkMicromapTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapTypeEXT - Type of micromap

Values which **can** be set in [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)::`type`
specifying the type of micromap, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkMicromapTypeEXT {
    VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT = 0,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV = 1000397000,
#endif
} VkMicromapTypeEXT;

* 
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](#) is a micromap containing
data to control the opacity of a triangle.

* 
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](#) is a micromap containing
data to control the displacement of subtriangles within a triangle.

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html), [VkMicromapCreateInfoEXT](VkMicromapCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMicromapTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
