# VkPhysicalDeviceBorderColorSwizzleFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceBorderColorSwizzleFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceBorderColorSwizzleFeaturesEXT - Structure describing whether samplers with custom border colors require the component swizzle specified in order to have defined behavior

The `VkPhysicalDeviceBorderColorSwizzleFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_border_color_swizzle
typedef struct VkPhysicalDeviceBorderColorSwizzleFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           borderColorSwizzle;
    VkBool32           borderColorSwizzleFromImage;
} VkPhysicalDeviceBorderColorSwizzleFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `borderColorSwizzle` indicates that
defined values are returned by sampled image operations when used with a
sampler that uses a [VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](VkBorderColor.html),
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](VkBorderColor.html),
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html), or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html) `borderColor` and an image view
that uses a non-[identity    component mapping](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings), when either `borderColorSwizzleFromImage` is
enabled or the [VkSamplerBorderColorComponentMappingCreateInfoEXT](VkSamplerBorderColorComponentMappingCreateInfoEXT.html)
is specified.

* 

`borderColorSwizzleFromImage` indicates that the implementation will
return the correct border color values from sampled image operations
under the conditions expressed above, without the application having to
specify the border color component mapping when creating the sampler
object.
If this feature bit is not set, applications **can** chain a
[VkSamplerBorderColorComponentMappingCreateInfoEXT](VkSamplerBorderColorComponentMappingCreateInfoEXT.html) structure when
creating samplers for use with image views that do not have an
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings) and, when
those samplers are combined with image views using the same component
mapping, sampled image operations that use opaque black or custom border
colors will return the correct border color values.

If the `VkPhysicalDeviceBorderColorSwizzleFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceBorderColorSwizzleFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBorderColorSwizzleFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceBorderColorSwizzleFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BORDER_COLOR_SWIZZLE_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_border_color_swizzle](VK_EXT_border_color_swizzle.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceBorderColorSwizzleFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
