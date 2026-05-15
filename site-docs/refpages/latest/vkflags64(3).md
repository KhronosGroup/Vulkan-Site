# VkFlags64(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFlags64.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFlags64 - Vulkan 64-bit bitmasks

A collection of 64-bit flags is represented by a bitmask using the type
`VkFlags64`:

// Provided by VK_VERSION_1_3, VK_KHR_synchronization2
typedef uint64_t VkFlags64;

When the 31 bits available in `VkFlags` are insufficient, the
`VkFlags64` type can be passed to commands and structures to
represent up to 64 options.
`VkFlags64` is not used directly in the API.
Instead, a `Vk*Flags2` type which is an alias of `VkFlags64`, and
whose name matches the corresponding `Vk*FlagBits2` that are valid for
that type, is used.

Any `Vk*Flags2` member or parameter used in the API as an input **must** be
a valid combination of bit flags.
A valid combination is either zero or the bitwise OR of valid bit flags.

An individual bit flag is valid for a `Vk*Flags2` type if it would be a
[valid enumerant](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-enums) when used with the
equivalent `Vk*FlagBits2` type, where the bits type is obtained by
taking the flag type and replacing the trailing `Flags2` with
`FlagBits2`.
For example, a flag value of type [VkAccessFlags2KHR](VkAccessFlags2.html) **must** contain only
bit flags defined by [VkAccessFlagBits2KHR](VkAccessFlagBits2.html).

Any `Vk*Flags2` member or parameter returned from a query command or
otherwise output from Vulkan to the application **may** contain bit flags
**undefined** in its corresponding `Vk*FlagBits2` type.
An application **cannot** rely on the state of these unspecified bits.

|  | Both the `Vk*FlagBits2` type, and the individual bits defined for that
| --- | --- |
type, are defined as `uint64_t` integers in the C API.
This is in contrast to the 32-bit types, where the `Vk*FlagBits` type is
defined as a C `enum` and the individual bits as enumerants belonging to
that `enum`.
As a result, there is less compile time type checking possible for the
64-bit types.
This is unavoidable since there is no sufficiently portable way to define a
64-bit `enum` type in C99. |

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAccessFlags2](VkAccessFlags2.html), [VkAccessFlags3KHR](VkAccessFlags3KHR.html), [VkBufferUsageFlags2](VkBufferUsageFlags2.html), [VkDataGraphPipelineDispatchFlagsARM](VkDataGraphPipelineDispatchFlagsARM.html), [VkDataGraphPipelineSessionCreateFlagsARM](VkDataGraphPipelineSessionCreateFlagsARM.html), `VkFlags`, [VkFormatFeatureFlags2](VkFormatFeatureFlags2.html), [VkMemoryDecompressionMethodFlagsEXT](VkMemoryDecompressionMethodFlagsEXT.html), [VkPhysicalDeviceSchedulingControlsFlagsARM](VkPhysicalDeviceSchedulingControlsFlagsARM.html), [VkPipelineCreateFlags2](VkPipelineCreateFlags2.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkTensorCreateFlagsARM](VkTensorCreateFlagsARM.html), [VkTensorUsageFlagsARM](VkTensorUsageFlagsARM.html), [VkTensorViewCreateFlagsARM](VkTensorViewCreateFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkFlags64).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
