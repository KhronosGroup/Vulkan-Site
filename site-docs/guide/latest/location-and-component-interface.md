# Location and Component Interface

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/location_component_interface.html

## Table of Contents

- [Advice for general users](#_advice_for_general_users)
- [Advice_for_general_users](#_advice_for_general_users)
- [Basic Example](#_basic_example)
- [16-bit](#_16_bit)
- [Crossing Location Boundaries](#_crossing_location_boundaries)
- [Crossing_Location_Boundaries](#_crossing_location_boundaries)
- [64-bit](#_64_bit)
- [Interleaving Components](#_interleaving_components)
- [Array](#_array)
- [Matrix](#_matrix)

## Content

This chapter is an overview of the [Location and Component Assignment](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-iointerfaces-locations) chapter to help give examples, especially around some of the more extreme edge cases.

The simplest way to think about a `Location` is that it is made up of four 32-bit `Component`.
This means a `vec4`/`float4`/`uvec4`/etc will fit perfectly in a single `Location`.
Multiple variables can be packed into the same `Location` if their `Componens` do not overlap.

Locations are used for both the `Input` and `Output` to interface between shaders stages when possible.

For most people, this chapter is much deeper into edge cases compared who developers generally use the `Location` interface. For those developers, the simple advise to take away is:

Use less `Location` if possible.

If you need many `Location`, make sure you are [under the limits](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-iointerfaces-limits).

Here is a basic example:

layout(location=0) in vec4 a;
layout(location=1, component = 0) in vec2 b;
layout(location=1, component = 2) in float c;

![location_example_basic](_images/location_example_basic.svg)

16-bit values always consume a full 32-bit `Component`. So a vector with 16-bit elements will consume the same resources as a vector with 32-bit elements; they are not tightly packed.

layout(location=0) in f16vec3 a;

![location_example_16bit](_images/location_example_16bit.svg)

All 16-bit and 32-bit vectors must be inside a single `Location`, so the following is **not** allowed.
The last two elements would consume `component = 4` and `component = 5`, which do not exist.

layout(location=0, component = 2) in vec4 a;

![location_example_boundaries](_images/location_example_boundaries.svg)

64-bit are special as they can consume up to 2 `Location`, but they must only start at `Component` `0` or `2`.

layout(location=0) in f64vec3 a;

![location_example_64bit](_images/location_example_64bit.svg)

The following attempt to have multiple variables alias the same component is [not allowed](https://godbolt.org/z/h61baYhT4).

layout(location=0) in vec2 in_a; // Components 0 and 1
layout(location=0, component=1) in float in_f; // Invalid: overlaps component 1

The following modification would make it legal as multiple variable can share a `Location`, just not a `Component`

layout(location=0) in vec2 in_a;
// Change in_f to use component 2 instead
- layout(location=0, component=1) in float in_f;
+ layout(location=0, component=2) in float in_f;

An element of an array will consume all every `Component` in a `Location` that it would consume as a non-arrayed value, with each subsequent element consuming the next available `Location`.

For example:

layout(location=0) in float a[3];

![location_example_array](_images/location_example_array.svg)

As seen, using a scalar or something such as a `vec2`/`float2` will leave many `Component` slots unused.

It is **allowed** to use any other `Component` in a `Location` that is being consumed by an array

|  | This behavior is guaranteed to work correctly with CTS 1.4.4.0 and higher compliant drivers. |
| --- | --- |

layout(location=0) in float a[3];
layout(location=2, component=2) in float b;

`float b` is still valid because the array consumes only the first part of `Location` 2.

![location_example_array2](_images/location_example_array2.svg)

|  | Some shader stages, like geometry shaders, have an array around its interface matching, this array is disregarded for the above examples. |
| --- | --- |

A matrix is viewed as an array, which consume all 4 components.

So something like

layout(location = 0) in mat3x2 a;

From a `Location`/`Component` point-of-view looks like

// N == 3
// Arrays consume whole Location
layout(location = 0) in vec2 a[3];

As stated above, arrays consume the whole `Location` so the following is **not** allowed.

layout(location = 0) in mat3x2 a;
layout(location = 2, component = 2) in float b;

`float b` is invalid because the implicit array of the matrix consumes all of `Location` 2.

![location_example_matrix](_images/location_example_matrix.svg)
