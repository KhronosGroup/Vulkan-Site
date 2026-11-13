# VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE - Structure describing whether SMPTE ST 2094-50 metadata is supported

The `VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE` structure is
defined as:

// Provided by VK_GOOGLE_hdr_smpte_st_209450_metadata
typedef struct VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdrSmpteSt209450;
} VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `hdrSmpteSt209450` specifies whether
SMPTE ST 2094-50 metadata is supported.

If the `VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE-sType-sType) VUID-VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HDR_SMPTE_ST_209450_FEATURES_GOOGLE](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_GOOGLE_hdr_smpte_st_209450_metadata](VK_GOOGLE_hdr_smpte_st_209450_metadata.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceHdrSmpteSt209450FeaturesGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
