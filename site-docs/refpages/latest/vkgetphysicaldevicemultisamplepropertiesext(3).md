# vkGetPhysicalDeviceMultisamplePropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceMultisamplePropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceMultisamplePropertiesEXT - Report sample count specific multisampling capabilities of a physical device

To query additional multisampling capabilities which **may** be supported for a
specific sample count, beyond the minimum capabilities described for
[Limits](../../../../spec/latest/chapters/limits.html#limits) above, call:

// Provided by VK_EXT_sample_locations
void vkGetPhysicalDeviceMultisamplePropertiesEXT(
    VkPhysicalDevice                            physicalDevice,
    VkSampleCountFlagBits                       samples,
    VkMultisamplePropertiesEXT*                 pMultisampleProperties);

* 
`physicalDevice` is the physical device from which to query the
additional multisampling capabilities.

* 
`samples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value specifying the
sample count to query capabilities for.

* 
`pMultisampleProperties` is a pointer to a
[VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html) structure in which information about
additional multisampling capabilities specific to the sample count is
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-samples-parameter) VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-pMultisampleProperties-parameter) VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-pMultisampleProperties-parameter

 `pMultisampleProperties` **must** be a valid pointer to a [VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html) structure

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkMultisamplePropertiesEXT](VkMultisamplePropertiesEXT.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
