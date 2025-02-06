import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ContentErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message}
            </p>
          </CardHeader>
        </Card>
      )
    }

    return this.props.children
  }
} 