# VkHostImageCopyDevicePerformanceQuery(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHostImageCopyDevicePerformanceQuery.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHostImageCopyDevicePerformanceQuery - Struct containing information about optimality of device access

To query if using [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) has a negative
impact on device performance when accessing an image, add
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) to
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`usage`, and add a
`VkHostImageCopyDevicePerformanceQuery` structure to the `pNext`
chain of a [VkImageFormatProperties2](VkImageFormatProperties2.html) structure passed to
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html).
This structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkHostImageCopyDevicePerformanceQuery {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           optimalDeviceAccess;
    VkBool32           identicalMemoryLayout;
} VkHostImageCopyDevicePerformanceQuery;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkHostImageCopyDevicePerformanceQuery
typedef VkHostImageCopyDevicePerformanceQuery VkHostImageCopyDevicePerformanceQueryEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimalDeviceAccess` returns [VK_TRUE](VK_TRUE.html) if use of host image
copy has no adverse effect on device access performance, compared to an
image that is created with exact same creation parameters, and bound to
the same [VkDeviceMemory](VkDeviceMemory.html), except that the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag is replaced with
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) and
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html).

* 
`identicalMemoryLayout` returns [VK_TRUE](VK_TRUE.html) if use of host image
copy has no impact on memory layout compared to an image that is created
with exact same creation parameters, and bound to the same
[VkDeviceMemory](VkDeviceMemory.html), except that the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) usage flag is replaced with
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) and
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html).

The implementation **may** return [VK_FALSE](VK_FALSE.html) in `optimalDeviceAccess`
if `identicalMemoryLayout` is [VK_FALSE](VK_FALSE.html).
If `identicalMemoryLayout` is [VK_TRUE](VK_TRUE.html), `optimalDeviceAccess`
**must** be [VK_TRUE](VK_TRUE.html).

The implementation **may** return [VK_TRUE](VK_TRUE.html) in `optimalDeviceAccess`
while `identicalMemoryLayout` is [VK_FALSE](VK_FALSE.html).
In this situation, any device performance impact **should** not be measurable.

If [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)::`format` is a
block-compressed format and [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)
returns [VK_SUCCESS](VkResult.html), the implementation **must** return [VK_TRUE](VK_TRUE.html) in
`optimalDeviceAccess`.

|  | Applications can make use of `optimalDeviceAccess` to determine their
| --- | --- |
resource copying strategy.
If a resource is expected to be accessed more on device than on the host,
and the implementation considers the resource sub-optimally accessed, it is
likely better to use device copies instead. |

|  | Layout not being identical yet still considered optimal for device access
| --- | --- |
could happen if the implementation has different memory layout patterns,
some of which are easier to access on the host. |

|  | The most practical reason for `optimalDeviceAccess` to be [VK_FALSE](VK_FALSE.html)
| --- | --- |
is that host image access may disable framebuffer compression where it would
otherwise have been enabled.
This represents far more efficient host image access since no compression
algorithm is required to read or write to the image, but it would impact
device access performance.
Some implementations may only set `optimalDeviceAccess` to
[VK_FALSE](VK_FALSE.html) if certain conditions are met, such as specific image usage
flags or creation flags. |

Valid Usage (Implicit)

* 
[](#VUID-VkHostImageCopyDevicePerformanceQuery-sType-sType) VUID-VkHostImageCopyDevicePerformanceQuery-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkHostImageCopyDevicePerformanceQuery).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
