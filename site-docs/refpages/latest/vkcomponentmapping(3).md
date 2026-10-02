# VkComponentMapping(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkComponentMapping.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkComponentMapping - Structure specifying a color component mapping

The `VkComponentMapping` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkComponentMapping {
    VkComponentSwizzle    r;
    VkComponentSwizzle    g;
    VkComponentSwizzle    b;
    VkComponentSwizzle    a;
} VkComponentMapping;

* 
`r` is a [VkComponentSwizzle](VkComponentSwizzle.html) specifying the component value
placed in the R component of the output vector.

* 
`g` is a [VkComponentSwizzle](VkComponentSwizzle.html) specifying the component value
placed in the G component of the output vector.

* 
`b` is a [VkComponentSwizzle](VkComponentSwizzle.html) specifying the component value
placed in the B component of the output vector.

* 
`a` is a [VkComponentSwizzle](VkComponentSwizzle.html) specifying the component value
placed in the A component of the output vector.

Valid Usage (Implicit)

* 
[](#VUID-VkComponentMapping-r-parameter) VUID-VkComponentMapping-r-parameter

 `r` **must** be a valid [VkComponentSwizzle](VkComponentSwizzle.html) value

* 
[](#VUID-VkComponentMapping-g-parameter) VUID-VkComponentMapping-g-parameter

 `g` **must** be a valid [VkComponentSwizzle](VkComponentSwizzle.html) value

* 
[](#VUID-VkComponentMapping-b-parameter) VUID-VkComponentMapping-b-parameter

 `b` **must** be a valid [VkComponentSwizzle](VkComponentSwizzle.html) value

* 
[](#VUID-VkComponentMapping-a-parameter) VUID-VkComponentMapping-a-parameter

 `a` **must** be a valid [VkComponentSwizzle](VkComponentSwizzle.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html), [VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html), [VkBufferCollectionPropertiesFUCHSIA](VkBufferCollectionPropertiesFUCHSIA.html), [VkComponentSwizzle](VkComponentSwizzle.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html), [VkSamplerBorderColorComponentMappingCreateInfoEXT](VkSamplerBorderColorComponentMappingCreateInfoEXT.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkComponentMapping).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
