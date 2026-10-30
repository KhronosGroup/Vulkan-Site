# VK_KHR_extended_flags

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_extended_flags.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Issue Details and Solution Space](#_issue_details_and_solution_space)
- [2._Issue_Details_and_Solution_Space](#_issue_details_and_solution_space)
- [2.1. Format Feature Flag Bits](#_format_feature_flag_bits)
- [2.1._Format_Feature_Flag_Bits](#_format_feature_flag_bits)
- [2.2. Image Create Flag Bits](#_image_create_flag_bits)
- [2.2._Image_Create_Flag_Bits](#_image_create_flag_bits)
- [2.3. Image Usage Flag Bits](#_image_usage_flag_bits)
- [2.3._Image_Usage_Flag_Bits](#_image_usage_flag_bits)
- [3. Proposal](#_proposal)
- [3.1. New 64-bit Format Feature Flags](#_new_64_bit_format_feature_flags)
- [3.1._New_64-bit_Format_Feature_Flags](#_new_64_bit_format_feature_flags)
- [3.2. New 64-bit Image Create Flags](#_new_64_bit_image_create_flags)
- [3.2._New_64-bit_Image_Create_Flags](#_new_64_bit_image_create_flags)
- [3.3. New 64-bit Image Usage Flags](#_new_64_bit_image_usage_flags)
- [3.3._New_64-bit_Image_Usage_Flags](#_new_64_bit_image_usage_flags)
- [3.4. Duplicate 64-bit Flags from Maintenance Extension](#_duplicate_64_bit_flags_from_maintenance_extension)
- [3.4._Duplicate_64-bit_Flags_from_Maintenance_Extension](#_duplicate_64_bit_flags_from_maintenance_extension)
- [3.5. Alternatives](#_alternatives)
- [3.6. Design Decisions](#_design_decisions)
- [3.6._Design_Decisions](#_design_decisions)
- [4. Issues](#_issues)
- [4.1. Const-ness of pNext](#_const_ness_of_pnext)
- [4.1._Const-ness_of_pNext](#_const_ness_of_pnext)
- [4.2. Extension Name](#_extension_name)
- [4.2._Extension_Name](#_extension_name)
- [4.3. Asymmetry Between Format Feature Flags and Image Create / Usage Flags](#_asymmetry_between_format_feature_flags_and_image_create_usage_flags)
- [4.3._Asymmetry_Between_Format_Feature_Flags_and_Image_Create_/_Usage_Flags](#_asymmetry_between_format_feature_flags_and_image_create_usage_flags)
- [4.4. Consistent Flag / Container Structure Naming](#_consistent_flag_container_structure_naming)
- [4.4._Consistent_Flag_/_Container_Structure_Naming](#_consistent_flag_container_structure_naming)
- [4.5. Adding More Types of Flag Bits](#_adding_more_types_of_flag_bits)
- [4.5._Adding_More_Types_of_Flag_Bits](#_adding_more_types_of_flag_bits)
- [4.6. UNRESOLVED: Does this extension need a feature structure?](#_unresolved_does_this_extension_need_a_feature_structure)
- [4.6._UNRESOLVED:_Does_this_extension_need_a_feature_structure?](#_unresolved_does_this_extension_need_a_feature_structure)
- [4.7. UNRESOLVED: Interactions of 32- and 64-bit Extending Structures](#_unresolved_interactions_of_32_and_64_bit_extending_structures)
- [4.7._UNRESOLVED:_Interactions_of_32-_and_64-bit_Extending_Structures](#_unresolved_interactions_of_32_and_64_bit_extending_structures)
- [4.8. UNRESOLVED: Support Extended Flags for VkSurfaceCapabilities2EXT and VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](#_unresolved_support_extended_flags_for_vksurfacecapabilities2ext_and_vkphysicaldeviceextendedsparseaddressspacepropertiesnv)
- [4.8._UNRESOLVED:_Support_Extended_Flags_for_VkSurfaceCapabilities2EXT_and_VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](#_unresolved_support_extended_flags_for_vksurfacecapabilities2ext_and_vkphysicaldeviceextendedsparseaddressspacepropertiesnv)
- [4.9. UNRESOLVED: Wrapper Structure Naming](#_unresolved_wrapper_structure_naming)
- [4.9._UNRESOLVED:_Wrapper_Structure_Naming](#_unresolved_wrapper_structure_naming)
- [4.10. Auto-Enabling Extension](#_auto_enabling_extension)
- [4.10._Auto-Enabling_Extension](#_auto_enabling_extension)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Issue Details and Solution Space](#_issue_details_and_solution_space)

[2.1. Format Feature Flag Bits](#_format_feature_flag_bits)
[2.2. Image Create Flag Bits](#_image_create_flag_bits)
[2.3. Image Usage Flag Bits](#_image_usage_flag_bits)

[3. Proposal](#_proposal)

[3.1. New 64-bit Format Feature Flags](#_new_64_bit_format_feature_flags)
[3.2. New 64-bit Image Create Flags](#_new_64_bit_image_create_flags)
[3.3. New 64-bit Image Usage Flags](#_new_64_bit_image_usage_flags)
[3.4. Duplicate 64-bit Flags from Maintenance Extension](#_duplicate_64_bit_flags_from_maintenance_extension)
[3.5. Alternatives](#_alternatives)
[3.6. Design Decisions](#_design_decisions)

[4. Issues](#_issues)

[4.1. Const-ness of pNext](#_const_ness_of_pnext)
[4.2. Extension Name](#_extension_name)
[4.3. Asymmetry Between Format Feature Flags and Image Create / Usage Flags](#_asymmetry_between_format_feature_flags_and_image_create_usage_flags)
[4.4. Consistent Flag / Container Structure Naming](#_consistent_flag_container_structure_naming)
[4.5. Adding More Types of Flag Bits](#_adding_more_types_of_flag_bits)
[4.6. UNRESOLVED: Does this extension need a feature structure?](#_unresolved_does_this_extension_need_a_feature_structure)
[4.7. UNRESOLVED: Interactions of 32- and 64-bit Extending Structures](#_unresolved_interactions_of_32_and_64_bit_extending_structures)
[4.8. UNRESOLVED: Support Extended Flags for VkSurfaceCapabilities2EXT and VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](#_unresolved_support_extended_flags_for_vksurfacecapabilities2ext_and_vkphysicaldeviceextendedsparseaddressspacepropertiesnv)
[4.9. UNRESOLVED: Wrapper Structure Naming](#_unresolved_wrapper_structure_naming)
[4.10. Auto-Enabling Extension](#_auto_enabling_extension)

This proposal details and addresses the issues solved by the
`VK_KHR_extended_flags` extension.

We have run out of free format feature flag bits and image usage flag bits,
and will soon run out of free image create flag bits.

Additionally, related APIs such as Vulkan SC would like to access more than
32 bit flags without pulling in unrelated features found in maintenance
extensions that initially defined 64-bit flags types.

There is a 64-bit `VkFormatFeatureFlagBits2` defined by
[VK_KHR_maintenance5](#{refpages}VK_KHR_maintenance5.adoc) at present,
with four remaining free bits.

There is a 32-bit `VkImageCreateFlagBits` type defined at present, with nine
remaining free bits.

There is a 32-bit `VkImageUsageFlagBits` type defined at present, all bits
of which are used or reserved.

Items introduced by this extension are:

Add a new 64-bit `VkFormatFeatureFlagBits4KHR` flag bits type,
`VkFormatFeatureFlags4KHR` flags type, and `VkFormatProperties4KHR`
structure for passing in and querying the new flags.

The new type does not duplicate any existing flag bits, unlike
`VkFormatFeatureFlagBits2` which duplicated bits from the 32-bit type
`VkFormatFeatureFlagBits`.

The new structure does not replace format feature flag bits specified by
existing commands and structures, unlike `VkFormatProperties3`, and does not
replace existing uses.
It is purely additive.

Note that there is no `VkFormatFeatureFlagBits3KHR` type in the API.
To avoid the `VkFormatFeatureFlagBits2` 

Add a new 64-bit `VkImageCreateFlagBits2KHR` flag bits type,
`VkImageCreateFlags2KHR` flags type, and `VkImageCreateFlags2CreateInfoKHR`
structure for passing in and querying the new flags.

The new type duplicates existing flag bits from the 32-bit
`VkImageCreateFlagBits`.

The new structure replaces image create flag bits specified by existing
parameters and structures.
Any bits specified through current parameters or structures must be included
in the corresponding new structures when they are passed or returned.

Add a new 64-bit `VkImageUsageFlagBits2KHR` flag bits type,
`VkImageUsageFlags2KHR` flags type, and `VkImageUsageFlags2CreateInfoKHR`,
`VkImageStencilUsage2CreateInfoKHR`, and `VkImageViewUsage2CreateInfoKHR`
structures for passing in and querying the new flags.

The new type duplicates existing flag bits from the 32-bit
`VkImageUsageFlagBits`.

The new structures replaces image usage flag bits specified by existing
parameters and structures.
Any bits specified through current parameters or structures must be included
in the corresponding new structures when they are passed or returned that
structure.
This follows the pattern established by `VkBufferUsageFlags2CreateInfo`.

Add all the same 64-bit flag types introduced by `VK_KHR_maintenance5`, with
identical definitions.

Numerous alternatives were discussed prior to VK_KHR_maintenance5, in
particular:

* 
Static or variable-sized arrays of flag bits, and setter / getter
functions.

* 
Packed bitfields

The model introduced by VK_KHR_maintenance5 first introduces a new 64-bit
flag type that reuses all the corresponding 32-bit flags, and a structure
passed in the new type in the pNext chain that replaces use of the 32-bit
flags where previously specified as explicit parameters or structure
members.
This means that only 32 new bits are made available, while preserving
some commonality with the older 32-bit flag type.
This model is used for the new image usage flag bits in this extension, for
symmetry with buffer usage flag bits.

For format feature flags this model does not work, since all 64 bits
provided by VK_KHR_format_feature_flags2 have been used.
The closest pattern is a new additive set of 64-bit flags and a structure
passed in the `pNext` chain that does not replace use of the older 32-bit or
64-bit flags, but supplements them.

The working group has generally resisted innovation in this area, such as
arrays of flags or structures containing packed single-bit array fields.

The new structures `VkFormatProperties4KHR`,
`VkImageCreateFlags2CreateInfoKHR`, and `VkImageUsageFlags2CreateInfoKHR`
have non-`const` `pNext` members.
This is because they can be passed to query as well as setter commands.

This is inconsistent with `VkBufferUsageFlags2CreateInfo` and
`VkPipelineCreateFlags2CreateInfo` from `VK_KHR_maintenance5`.
Those structures should also be non-`const`, but practically speaking it is
probably too late to fix that now (or for the many, many other structures
that can be passed to queries yet have `const` `pNext`).

We are including multiple, unrelated APIs in this extension.
It is called `VK_KHR_extended_flags`, rather than trying to capture all the
new types in the extension name.

In the future there could be a `VK_KHR_extended_flags2` if other flag types
need to be extended.

Only 32 new image create and image usage flags are provided by this
extension, while 64 new format feature flags are provided.
This follows the existing pattern of 64-bit buffer usage flags for image
create and usage flags.
There is already a 64-bit format feature flags type.
This extension introduces a new pattern for a second set of 64 format
feature flags, where all 64 bits are initially free.

An alternative was to make the new image usage flag structure purely
additive, instead of requiring it duplicate the existing 32-bit flags.
That would have given 32 additional flag bits, at the price of breaking
symmetry with 64-bit buffer usage flags.

`VkFormatProperties4KHR` is a container structure for the
`VkFormatFeatureFlagBits4KHR` flag bits.

There is no `VkFormatFeatureFlagBits3KHR` in the API.
This is a unfortunate consequence of how VK_KHR_format_feature_flags2 used
`VkFormatProperties3` as a container for the `VkFormatFeatureFlagBits2` flag
bits.
We skip over the `3` and use `VkFormatFeatureFlagBits4KHR`, instead.
This cannot address the existing inconsistency, but at least does not
propagate it going forward.

This extension preemptively adds `VkImageCreateFlagBits2KHR` even though
there are 9 free bits remaining in the existing 32-bit type, because we
expect those bits to be consumed in the relatively near future.

We duplicate the 64-bit flag bit types from `VK_KHR_maintenance5` in this
extension.
This allows other API variants, such as Vulkan SC, to access the additional
flags which not imposing the burden of other maintenance features in that
extension.

A feature structure has become normal practice for new extensions, although
for this extension, it conveys no information beyond the extension itself
being enabled.

Note that the closest analogy is VK_KHR_format_feature_flags2, which does
not have a feature structure.

PROPOSED: Added a feature structure because it was simple.
It is easily removed if not needed.

Where 32-bit flags can be provided via an extending structure, such as
`VkImageStencilUsageCreateInfo`, and this extension defines a similar
extending structure such as `VkImageStencilUsage2CreateInfoKHR`, what should
behavior be for setters and queries?

Setters have ambiguity if both are present.
Queries do not have ambiguity but there is little apparent value.

PROPOSED: Disallowed for both setters and queries, by explicit VU in the
structures they extend.

PROPOSED: No. These seem like fairly obscure extension interactions and
require significant new API surface to define.
Especially the NV extension, which already does not have an interaction for
VkBufferUsageFlags2.

Names like `VkImageUsageFlags2CreateInfoKHR` tie these structures to e.g.
`VkImageCreateInfo`, even though some of the wrappers can be used in many
other pNext chains.
This is consistent with the existing 64-bit buffer and pipeline flag
structures but a more generic convention like `VkImageUsageFlags2WrapperKHR`
could be better.

If we do this, applying it consistently to the existing 64-bit flags would
result in a lot of aliasing.

We considered automatically enabling this extension, if supported.
As common infrastructure, this would be a convenience, but it is
inconsistent with existing practice.
We will not do this.

Auto-enabling is a broader topic to be addressed separately.
