# VkPhysicalDeviceCustomBorderColorFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCustomBorderColorFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCustomBorderColorFeaturesEXT - Structure describing whether custom border colors can be supported by an implementation

The `VkPhysicalDeviceCustomBorderColorFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_custom_border_color
typedef struct VkPhysicalDeviceCustomBorderColorFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           customBorderColors;
    VkBool32           customBorderColorWithoutFormat;
} VkPhysicalDeviceCustomBorderColorFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `customBorderColors` indicates that
the implementation supports providing a `borderColor` value with one
of the following values at sampler creation time:

[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html)

* 
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

`customBorderColorWithoutFormat` indicates that explicit formats are
not required for custom border colors and the value of the `format`
member of the [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) structure
**may** be [VK_FORMAT_UNDEFINED](VkFormat.html).
If this feature bit is not set, applications **must** provide the
[VkFormat](VkFormat.html) of the image view(s) being sampled by this sampler in the
`format` member of the [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html)
structure.

If the `VkPhysicalDeviceCustomBorderColorFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceCustomBorderColorFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCustomBorderColorFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceCustomBorderColorFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceCustomBorderColorFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
