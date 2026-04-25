# VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE - Structure describing the video encode RGB conversion features that can be supported by an implementation

The `VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE` structure is
defined as:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef struct VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeRgbConversion;
} VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeRgbConversion`
specifies that the implementation supports [video    encode RGB conversion](../../../../spec/latest/chapters/videocoding.html#encode-rgb-conversion).

If the `VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_RGB_CONVERSION_FEATURES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VALVE_video_encode_rgb_conversion](VK_VALVE_video_encode_rgb_conversion.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
