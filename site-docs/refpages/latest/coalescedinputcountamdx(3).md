# CoalescedInputCountAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CoalescedInputCountAMDX.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CoalescedInputCountAMDX - Number of inputs coalesced for a coalescing node in a work graph

`CoalescedInputCountAMDX`

Decorating a variable with the `CoalescedInputCountAMDX` built-in
decoration will make that variable contain the number of node dispatches
that the implementation coalesced into the input for the current shader.
This variable will take a value in the range [1, arraySize), where
arraySize is the maximum size of the input payload array for the
shader.

Valid Usage

* 
[](#VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09172) VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09172

The variable decorated with `CoalescedInputCountAMDX` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09173) VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09173

If a variable is decorated with `CoalescedInputCountAMDX`, the
`CoalescingAMDX` execution mode **must** be declared

* 
[](#VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09174) VUID-CoalescedInputCountAMDX-CoalescedInputCountAMDX-09174

The variable decorated with `CoalescedInputCountAMDX` **must** be
declared as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
