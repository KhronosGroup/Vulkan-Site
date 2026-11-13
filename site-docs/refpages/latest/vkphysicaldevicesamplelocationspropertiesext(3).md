# VkPhysicalDeviceSampleLocationsPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSampleLocationsPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSampleLocationsPropertiesEXT - Structure describing sample location limits that can be supported by an implementation

The `VkPhysicalDeviceSampleLocationsPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_sample_locations
typedef struct VkPhysicalDeviceSampleLocationsPropertiesEXT {
    VkStructureType       sType;
    void*                 pNext;
    VkSampleCountFlags    sampleLocationSampleCounts;
    VkExtent2D            maxSampleLocationGridSize;
    float                 sampleLocationCoordinateRange[2];
    uint32_t              sampleLocationSubPixelBits;
    VkBool32              variableSampleLocations;
} VkPhysicalDeviceSampleLocationsPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `sampleLocationSampleCounts`
is a bitmask of [VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the sample counts
supporting custom sample locations.

* 
 `maxSampleLocationGridSize` is
the maximum size of the pixel grid in which sample locations **can** vary
that is supported for all sample counts in
`sampleLocationSampleCounts`.

* 

`sampleLocationCoordinateRange`[2] is the range of supported sample
location coordinates.

* 
 `sampleLocationSubPixelBits`
is the number of bits of subpixel precision for sample locations.

* 
 `variableSampleLocations`
specifies whether the sample locations used by all pipelines that will
be bound to a command buffer during a subpass **must** match.
If set to [VK_TRUE](VK_TRUE.html), the implementation supports variable sample
locations in a subpass.
If set to [VK_FALSE](VK_FALSE.html), then the sample locations **must** stay constant
in each subpass.

If the `VkPhysicalDeviceSampleLocationsPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSampleLocationsPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceSampleLocationsPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLE_LOCATIONS_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), `VkBool32`, [VkExtent2D](VkExtent2D.html), [VkSampleCountFlags](VkSampleCountFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
